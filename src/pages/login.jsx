import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonIcon,
  IonItem,
} from "@ionic/react";
import { personCircleOutline, lockClosedOutline } from "ionicons/icons";
import "../styles/login.css";

const Login = ({ onNavigateRegister }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <IonPage>
      <IonContent className="auth-page ion-padding">
        <div className="auth-container">
          <IonCard className="auth-card fade-in">
            <IonCardHeader>
              <IonCardTitle className="auth-title">Bienvenido</IonCardTitle>
              <IonText color="medium">
                Inicia sesión para continuar
              </IonText>
            </IonCardHeader>

            <IonCardContent>
              {/* Campo Email */}
              <IonItem className="input-item">
                <IonIcon icon={personCircleOutline} slot="start" />
                <IonInput
                  label="Correo electrónico"
                  labelPlacement="floating"
                  type="email"
                  value={form.email}
                  fill="outline"
                  onIonChange={(e) =>
                    setForm({ ...form, email: e.detail.value })
                  }
                />
              </IonItem>

              {/* Campo Contraseña */}
              <IonItem className="input-item">
                <IonIcon icon={lockClosedOutline} slot="start" />
                <IonInput
                  label="Contraseña"
                  labelPlacement="floating"
                  type="password"
                  value={form.password}
                  fill="outline"
                  onIonChange={(e) =>
                    setForm({ ...form, password: e.detail.value })
                  }
                />
              </IonItem>

              <IonButton expand="block" className="auth-btn" routerLink="/home">
                Iniciar sesión
              </IonButton>

              <div className="register-section">
                <IonText color="medium">
                ¿Ya tienes cuenta?{" "}
                <IonButton
                  routerLink="/register"
                  fill="clear"
                  onClick={onNavigateRegister}
                >
                  Regístrate aquí
                </IonButton>
              </IonText>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

