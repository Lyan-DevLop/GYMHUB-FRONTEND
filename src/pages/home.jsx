import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { calendar, barbell, personCircle, clipboard } from "ionicons/icons";
import "../styles/home.css";

const Home = () => {
  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle>GYM HUB</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* CONTENT */}
      <IonContent fullscreen className="ion-padding home-content">
        <div className="welcome-section">
          <h1>¡Bienvenido de nuevo!</h1>
          <p>Gestiona tus reservas, clases y perfil fácilmente.</p>
        </div>

        {/* TARJETAS DE ACCESO RÁPIDO */}
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard button routerLink="/servicios" className="home-card">
                <IonCardHeader>
                  <IonIcon icon={barbell} className="home-icon" />
                  <IonCardTitle>Servicios</IonCardTitle>
                  <IonCardSubtitle>Ver servicios disponibles</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard button routerLink="/reservas" className="home-card">
                <IonCardHeader>
                  <IonIcon icon={calendar} className="home-icon" />
                  <IonCardTitle>Reservas</IonCardTitle>
                  <IonCardSubtitle>Mis reservas</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonCard button routerLink="/perfil" className="home-card">
                <IonCardHeader>
                  <IonIcon icon={personCircle} className="home-icon" />
                  <IonCardTitle>Coach</IonCardTitle>
                  <IonCardSubtitle>Ver perfiles</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard button routerLink="/reportes" className="home-card">
                <IonCardHeader>
                  <IonIcon icon={clipboard} className="home-icon" />
                  <IonCardTitle>Reportes</IonCardTitle>
                  <IonCardSubtitle>Resumen</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* BOTÓN PRINCIPAL */}
        <div className="home-action">
          <IonButton expand="block" color="tertiary" routerLink="/clases">
            Explorar clases
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
