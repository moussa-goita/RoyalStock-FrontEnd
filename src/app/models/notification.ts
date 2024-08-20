export interface Notification {
  id: number;
  contenu: string;
  dateNotif: Date;
  read: boolean;
  type: string;
  createDay: string;
  message: string;
  utilisateur: {
    id: number;
    username: string;
  };
}
