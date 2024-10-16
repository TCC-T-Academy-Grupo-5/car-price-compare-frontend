# PRECIFICAR

This project is an Angular application called **precificar**, designed to help users compare car prices using data from various online sources, including the FIPE table. The platform allows users to find specific vehicles, set alerts for price drops, and visualize price trends over time.

- [Precificar API](https://github.com/TCC-T-Academy-Grupo-5/car-price-compare-frontend.git)

## Objective

The project aims to develop a web platform similar to Buscapé, but focused on vehicles. Users can compare prices of used and new cars from different online stores by collecting current prices through web scraping and comparing them to the reference values from the FIPE table.

## Technologies Used

- **Application**: [Angular 18](https://angular.dev/overview);
- **Container**: [Docker](https://docs.docker.com/);
- **styles**: [Tailwind CSS](https://tailwindcss.com/docs/installation) and [Angular Material](https://material.angular.io/);
- **Icons**: [Google Symbols & Icons](https://fonts.google.com/icons).

## Features

1. Search and Comparison Interface: Users can search for vehicles by types, brand, model, year, and location, displaying a comparative list of car prices.
2. Custom Alerts: Users can set alerts for when a specific vehicle's price falls below a certain value.
3. Price History and Trend Graphs: Users can visualize the price history of specific vehicles over time.
4. Store Rating System: Users can rate and review the stores where cars are advertised.


### Running Full Stack Application

Ensure you have Docker and Docker Compose installed on your machine.

#### Clone the Repositories

To get started, clone both the frontend and backend repositories using the following command:
```bash
git clone https://github.com/TCC-T-Academy-Grupo-5/car-price-compare-backend.git && \
git clone https://github.com/TCC-T-Academy-Grupo-5/car-price-compare-frontend.git && \
cd car-price-compare-frontend
```

#### Running the Application with Docker

To run the application, execute the following command from the project directory:

docker-compose up --build

## Backend Access

The backend service is accessible at:
```http request
GET http://localhost:8080`
```
> For more details on the backend implementation, please refer to the [API Repository](https://github.com/TCC-T-Academy-Grupo-5/car-price-compare-frontend.git).

## Project Structure

The project consists of:

- Frontend: Located in the ./car-price-compare-frontend directory.
- Backend: Located in the ../car-price-compare-backend directory.
