import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { AddUpdateProductComponent } from '../shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit(){

  }

  //Cerrar Sesión
  signOut(){
    this.firebaseSvc.signOut();
  }

  //Agregar o Actualizar producto
  addUpdateProduct(){
    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent
    })
  }

}
