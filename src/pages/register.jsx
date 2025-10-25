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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { personCircle, mail, lockClosed } from "ionicons/icons";
import "../styles/register.css";

const Register = ({ onNavigateLogin }) => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    rol: "",
  });

  return (
    <IonPage>
      <IonContent className="auth-page ion-padding">
        <div className="auth-container">
          <IonCard className="auth-card fade-in">
            <IonCardHeader>
              <IonCardTitle className="auth-title">Crear Cuenta</IonCardTitle>
              <IonText color="medium">Completa tus datos</IonText>
            </IonCardHeader>

            <IonCardContent>
              {/* Nombre */}
              <div className="input-group">
                <IonIcon icon={personCircle} className="input-icon" />
                <IonInput
                  label="Nombre completo"
                  labelPlacement="floating"
                  value={form.nombre}
                  onIonChange={(e) =>
                    setForm({ ...form, nombre: e.detail.value })
                  }
                />
              </div>

              {/* Correo */}
              <div className="input-group">
                <IonIcon icon={mail} className="input-icon" />
                <IonInput
                  label="Correo electrónico"
                  labelPlacement="floating"
                  type="email"
                  value={form.correo}
                  onIonChange={(e) =>
                    setForm({ ...form, correo: e.detail.value })
                  }
                />
              </div>

              {/* Contraseña */}
              <div className="input-group">
                <IonIcon icon={lockClosed} className="input-icon" />
                <IonInput
                  label="Contraseña"
                  labelPlacement="floating"
                  type="password"
                  value={form.password}
                  onIonChange={(e) =>
                    setForm({ ...form, password: e.detail.value })
                  }
                />
              </div>

              {/* Rol */}
              <div className="input-group">
                <IonIcon icon={personCircle} className="input-icon" />
                <IonSelect
                  label="Rol"
                  labelPlacement="floating"
                  value={form.rol}
                  onIonChange={(e) =>
                    setForm({ ...form, rol: e.detail.value })
                  }
                >
                  <IonSelectOption value="Admin">Admin</IonSelectOption>
                  <IonSelectOption value="Cliente">Cliente</IonSelectOption>
                </IonSelect>
              </div>

              {/* Botón principal */}
              <IonButton expand="block" className="auth-btn" routerLink="/login">
                Registrarme
              </IonButton>

              {/* Enlace a login */}
              <IonText color="medium" className="register-text">
                ¿Ya tienes cuenta?{" "}
                <IonButton
                  routerLink="/login"
                  fill="clear"
                  onClick={onNavigateLogin}
                >
                  Inicia sesión
                </IonButton>
              </IonText>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
