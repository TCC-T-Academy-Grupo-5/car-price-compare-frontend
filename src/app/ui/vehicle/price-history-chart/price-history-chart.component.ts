import {Component, Input, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {FipePrice} from '@domain/vehicle/fipeprice';
import { ThemeService } from '@services/theme.service';
import {ChartData, ChartOptions} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tcc-price-history-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './price-history-chart.component.html'
})
export class PriceHistoryChartComponent implements OnChanges, OnDestroy {
  @Input({required: true}) fipePrices: FipePrice[] = [];
  isDarkMode: boolean | undefined;
  chartMainColor = '';
  dataSetBorderColor = '';

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
          text: 'Mês',
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
          text: 'Preço (R$)',
          color: this.chartMainColor
        }
      }
    }
  };

  currentThemeSubscription: Subscription | undefined;

  constructor(private themeService: ThemeService) {}

  ngOnChanges(changes:SimpleChanges) {
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

      this.currentThemeSubscription = this.themeService.getCurrentThemeObservable().subscribe(theme => {
        this.isDarkMode = theme === 'dark';
        this.chartMainColor = this.isDarkMode ?  '#c0c0c5' : '#6e6e72';
        this.dataSetBorderColor = this.isDarkMode ?  '#2CF4CE' : '#00747C';
        this.updateChartData(months, prices);
        this.updateChartColors();
      })
    }
  }

  ngOnDestroy() {
    this.currentThemeSubscription?.unsubscribe();
  }

  updateChartData(months: string[], prices: number[]): void {
    this.priceChartData = {
      labels: months,
      datasets: [
        {
          data: prices,
          label: 'Preço por mês',
          borderColor: this.isDarkMode ? '#2CF4CE' : '#00747C',
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
  }
}
