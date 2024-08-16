import { Point } from "./point";


export class Entrepot {
  // entrepotId: any;
  id: number;
    entrepotName: string;
    lieu: string;
    statut: string;
    dateCreate: Date;
    abonnementStart: Date;
    abonnementEnd: Date;
    location: Point;
    latitude: number;
    longitude: number;
    distance: number;



    constructor(id:number,entrepotName:string,
        lieu:string,statut:string,dateCreate:Date,
        abonnementEnd:Date,location:Point,
        abonnementStart:Date,
        latitude:number,longitude:number,distance:number){
        this.id = id;
        this.entrepotName = entrepotName;
        this.lieu = lieu;
        this.statut = statut;
        this.dateCreate = dateCreate;
        this.abonnementEnd = abonnementEnd;
        this.abonnementStart = abonnementStart;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.distance = distance;
    }

   
}
