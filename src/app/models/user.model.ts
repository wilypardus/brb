export class UserModel{
  eventId:string
  uid:string;
  nombre:string;
  email:string;
  img:string;
  created:Date;
  activo:boolean;
  adminProtected:{
    status:boolean,
    pwd:string;
  };
}
