import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject} from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  utilsSvc = inject(UtilsService);


  //**************Autenticación
  getAuth() {
    return getAuth();
  }

  // Acceder
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //Crear Usuario
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //Actualizar Usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }
  //Enviar email para restablecer contraseña
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  //Cerrar Sesión
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }

  //************Base de Datos
  getCollectionData(path:string, collectionQuery ?: any){
    const ref = collection(getFirestore(), path)
    return collectionData(query(ref,...collectionQuery), {idField: 'id'});
  }

  //Setear un documento
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //Eliminar un documento
  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }

  //Actualizar un documento
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  //Obtener un documento
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //Agregar un documento
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  //************ALMACENAMIENTO

  //Subir Imagen
  async uploadImage(path: string, data_url: string){
    return uploadString(ref(getStorage(),path),data_url,'data_url').then(() => {
      return getDownloadURL(ref(getStorage(),path))
    });
  }

  //Obtener ruta de la imagen con su URL
  async getFilePath(url:string){
    return ref(getStorage(),url).fullPath
  }

  //Eliminar Archivo
  deleteFile(path: string){
    return deleteObject(ref(getStorage(),path));
  }

}
