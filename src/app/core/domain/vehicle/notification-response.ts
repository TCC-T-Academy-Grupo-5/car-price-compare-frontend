export interface NotificationResponse {
  notificationId: string;
  notificationType: string;
  notificationStatus: string;
  currentFipePrice: number;
  vehicle: {
    vehicleId: string;
    fipeCode: string;
    name: string;
    year: string;
    model: string;
    brand: string;
    vehicleType: string;
    modelCategory: string;
  }
}
