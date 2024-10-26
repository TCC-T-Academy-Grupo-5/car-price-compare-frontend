import {Component, Input, OnChanges, SimpleChanges, OnDestroy, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FipePrice} from '@domain/vehicle/fipeprice';
import {ThemeService} from '@services/theme.service';
import {Chart, ChartData, ChartOptions} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'tcc-price-history-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './price-history-chart.component.html'
})
export class PriceHistoryChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input({required: true}) fipePrices: FipePrice[] = [];
  @ViewChild('priceChart') priceChart!: ElementRef<HTMLCanvasElement>;

  isDarkMode: boolean | undefined;
  chartMainColor = '';
  dataSetBorderColor = '';
  chart!: Chart;

  public priceChartData!: ChartData<'line'>;
  public priceChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: this.chartMainColor,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: this.chartMainColor
        },
        ticks: {
          color: this.chartMainColor
        },
        title: {
          display: true,
          text: '',
          color: this.chartMainColor
        }
      },
      y: {
        grid: {
          color: this.chartMainColor
        },
        ticks: {
          color: this.chartMainColor
        },
        title: {
          display: true,
          text: '',
          color: this.chartMainColor
        }
      }
    }
  };

  themeChangeSubscription: Subscription | undefined;
  langChangeSubscription: Subscription | undefined;

  constructor(private themeService: ThemeService, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.priceChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          label: '',
          borderColor: this.dataSetBorderColor,
          fill: false,
        }
      ]
    }

    this.themeChangeSubscription = this.themeService.getCurrentThemeObservable().subscribe(theme => {
      this.isDarkMode = theme === 'dark';
      this.chartMainColor = this.isDarkMode ? '#c0c0c5' : '#6e6e72';
      this.dataSetBorderColor = this.isDarkMode ? '#2CF4CE' : '#00747C';
      console.log('current theme subscription:  color', this.dataSetBorderColor)
      this.updateChartColors();
      this.updateChart();
    })

    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.updateTranslations();
      this.updateChart();
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fipePrices'] && this.fipePrices?.length) {
      this.fipePrices = [...this.fipePrices].sort((a, b) => {
        const yearDifference = a.year - b.year;
        if (yearDifference !== 0) {
          return yearDifference;
        }
        return a.month - b.month;
      });
      const months = this.fipePrices.map(data => `${data.month}/${data.year}`);
      const prices = this.fipePrices.map(data => data.price);
      this.updateChartColors();
      this.updateChartData(months, prices);
      this.updateTranslations();
      this.updateChart();
    }
  }

  ngOnDestroy() {
    this.themeChangeSubscription?.unsubscribe();
    this.langChangeSubscription?.unsubscribe();
  }

  updateChartData(months: string[], prices: number[]): void {
    this.priceChartData = {
      labels: months,
      datasets: [
        {
          data: prices,
          label: '',
          borderColor: this.dataSetBorderColor,
          fill: false,
        }
      ]
    }
  }

  updateChartColors(): void {
    if (this.priceChartOptions.plugins && this.priceChartOptions.plugins.legend?.labels) {
      this.priceChartOptions.plugins.legend.labels.color = this.chartMainColor;
    }

    if (this.priceChartOptions.scales) {
      const xScale = this.priceChartOptions.scales['x'];
      const yScale = this.priceChartOptions.scales['y'];

      if (xScale && xScale.grid && xScale.ticks && xScale.title) {
        xScale.grid.color = this.chartMainColor;
        xScale.ticks.color = this.chartMainColor;
        xScale.title.color = this.chartMainColor;
      }

      if (yScale && yScale.grid && yScale.ticks && yScale.title) {
        yScale.grid.color = this.chartMainColor;
        yScale.ticks.color = this.chartMainColor;
        yScale.title.color = this.chartMainColor;
      }
    }

    if (this.priceChartData.datasets && this.priceChartData.datasets.length > 0) {
      this.priceChartData.datasets.forEach((dataSet) => {
        dataSet.borderColor = this.dataSetBorderColor;
      })
    }
  }

  updateTranslations(): void {
    this.translateService.stream('vehicle.fipe_history.month').subscribe(translation => {
      if (this.priceChartOptions.scales?.['x']?.title) {
        this.priceChartOptions.scales['x'].title.text = translation;
      }
    });

    this.translateService.get('vehicle.fipe_history.price').subscribe(translation => {
      if (this.priceChartOptions.scales?.['y']?.title) {
        this.priceChartOptions.scales['y'].title.text = translation;
      }
    })

    this.translateService.get('vehicle.fipe_history.chart_legend').subscribe(translation => {
      if (this.priceChartData.datasets.length) {
        this.priceChartData.datasets[0].label = translation;
      }
    })
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.priceChart.nativeElement, {
      type: 'line',
      data: this.priceChartData,
      options: this.priceChartOptions
    });
  }
}
