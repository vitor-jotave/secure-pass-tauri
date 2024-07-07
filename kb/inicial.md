<visao_geral>
Este projeto é um gerenciador de senhas chamado SecurePass, que possui diversas funcionalidades, incluindo a criação, listagem, edição e exclusão de senhas, bem como funções de registro, login e logout de usuários. O projeto está dividido em uma estrutura de frontend em React e backend em Rust.
</visao_geral>

<funcionalidades>
- Criar senha: a senha contém o nome do serviço, username, senha, a pasta onde a senha será armazenada, um user_id para identificar o usuário proprietário da senha, e um id que será usado para acessar a senha para edição ou exclusão.
- Listar senhas: exibe as senhas apenas do usuário logado.
- Listar senhas por pasta: exibe as senhas da pasta selecionada, por exemplo, "Bancos".
- Listar pastas: exibe as pastas que contêm senhas do usuário logado.
- Editar senha: permite a alteração do username, senha e pasta, mas não do serviço.
- Deletar senha: pode ser realizada a partir do id da senha.
- Registro, login e logout de usuário.
</funcionalidades>
<estrutura>
O projeto está organizado nas seguintes pastas e arquivos:
src:

-assets
-components
--AddPassword.tsx
--BottomNav.tsx
--FoldersView.tsx
--Header.tsx
--Item.tsx
--ItemList.tsx
--PasswordAlert.tsx
--PasswordGenerator.tsx
--PasswordView.tsx
--SearchBar.tsx
--SettingsView.tsx
--SplashScreen.tsx
-hooks
--useScrollPosition.ts
--useVisibility.ts
-lib
--utils.ts
App.tsx
global.css
main.tsx
</estrutura>
<exemplo_codigo>
Aqui está um exemplo do arquivo App.tsx que serve como base de código para a aplicação React:

tsx

import React, { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ItemList from "./components/ItemList";
import BottomNav from "./components/BottomNav";
import SplashScreen from "./components/SplashScreen";
import AddPassword from "./components/AddPassword";
import PasswordView from "./components/PasswordView";
import FoldersView from "./components/FoldersView";
import PasswordGenerator from "./components/PasswordGenerator";
import SettingsView from "./components/SettingsView";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthService from "./lib/AuthService";

const foldersData = [
  { name: "Bancos", items: 1, color: "bg-orange-500" },
  { name: "Aplicativos", items: 1, color: "bg-pink-500" },
  // Adicione mais pastas conforme necessário
];

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState<'home' | 'addPassword' | 'passwordView' | 'foldersView' | 'generatorView' | 'settingsView' | 'login' | 'register'>('login');
  const [transition, setTransition] = useState<string>('fade-in');
  const [selectedPassword, setSelectedPassword] = useState<null | {
    label: string;
    username: string;
    password: string;
  }>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
    setTransition('fade-in');
  };

  const handleAddPasswordClick = useCallback(() => {
    setTransition('fade-out');
    setTimeout(() => {
      setView('addPassword');
      setTransition('slide-in-bottom');
    }, 200);
  }, []);

  const handleBackClick = useCallback(() => {
    setTransition('slide-out-bottom');
    setTimeout(() => {
      setView('home');
      setTransition('fade-in');
    }, 500);
  }, []);

  const handlePasswordItemClick = useCallback((password: {
    label: string;
    username: string;
    password: string;
  }) => {
    setSelectedPassword(password);
    setView('passwordView');
    setTransition('fade-in');
  }, []);

  const handlePasswordViewBackClick = useCallback(() => {
    setSelectedPassword(null);
    setView('home');
    setTransition('fade-in');
  }, []);

  const handleFoldersClick = useCallback(() => {
    setTransition('fade-out-content');
    setTimeout(() => {
      setView('foldersView');
      setTransition('fade-in-content');
    }, 200);
  }, []);

  const handleFoldersViewBackClick = useCallback(() => {
    setView('home');
    setTransition('fade-in');
  }, []);

  const handleHomeClick = useCallback(() => {
    setTransition('fade-out-content');
    setTimeout(() => {
      setView('home');
      setSelectedPassword(null);
      setTransition('fade-in-content');
    }, 200);
  }, []);

  const handlePasswordGeneratorClick = useCallback(() => {
    setTransition('fade-out-content');
    setTimeout(() => {
      setView('generatorView');
      setSelectedPassword(null);
      setTransition('fade-in-content');
    }, 200);
  }, []);

  const handleSettingsClick = useCallback(() => {
    setTransition('fade-out-content');
    setTimeout(() => {
      setView('settingsView');
      setSelectedPassword(null);
      setTransition('fade-in-content');
    }, 200);
  }, []);

  const handleLoginClick = useCallback(() => {
    setTransition('fade-out-content');
    setTimeout(() => {
      setView('login');
      setTransition('fade-in-content');
    }, 200);
  }, []);

  const handleRegisterClick = useCallback(() => {
    setTransition('fade-out-content');
    setTimeout(() => {
      setView('register');
      setTransition('fade-in-content');
    }, 200);
  }, []);

  const handleLogout = useCallback(async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
    setView('login');
  }, []);

  const handleRegisterSuccess = useCallback(() => {
    setTransition('fade-out-content');
    setTimeout(() => {
      setView('login');
      setTransition('fade-in-content');
    }, 200);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    setTransition('fade-out-content');
    setTimeout(() => {
      setView('home');
      setTransition('fade-in-content');
    }, 200);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => {
        setTransition('fade-in');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransition('');
    }, 500);
    return () => clearTimeout(timer);
  }, [view]);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = async () => {
      try {
        const user = AuthService.getUser();
        if (user) {
          setIsAuthenticated(true);
          setView('home');
        } else {
          const authenticated = await AuthService.isAuthenticated();
          setIsAuthenticated(authenticated);
          if (authenticated) {
            setView('home');
          } else {
            setView('login');
          }
        }
      } catch (err) {
        console.error('Failed to check authentication status:', err);
        setView('login');
      }
    };

    checkAuth();
  }, []);

  const renderContent = () => {
    if (!isAuthenticated && view !== 'login' && view !== 'register') {
      return (
        <div className={`h-full flex flex-col min-h-screen text-neutral-200 overflow-hidden ${transition}`}>
          <div className="flex-1 overflow-y-auto">
            <Login onRegisterClick={handleRegisterClick} onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      );
    }

    switch (view) {
      case 'addPassword':
        return (
          <div className={`inset-0 bg-fullblack z-60 ${transition}`}>
            <AddPassword onBackClick={handleBackClick} />
          </div>
        );
      case 'passwordView':
        return (
          <div className={`fixed inset-0 bg-fullblack z-50 ${transition}`}>
            <PasswordView password={selectedPassword!} onBackClick={handlePasswordViewBackClick} />
          </div>
        );
      case 'foldersView':
        return (
          <div>
            <div className={`fixed inset-0 text-white ${transition}`}>
              <FoldersView folders={foldersData} onBackClick={handleFoldersViewBackClick} />
            </div>
            <BottomNav onAddPasswordClick={handleAddPasswordClick} onFoldersClick={handleFoldersClick} onHomeClick={handleHomeClick} onPasswordGeneratorClick={handlePasswordGeneratorClick} onSettingsClick={handleSettingsClick} onLogoutClick={handleLogout} />
          </div>
        );
      case 'generatorView':
        return (
          <div className={`h-full flex flex-col min-h-screen text-neutral-200 overflow-hidden ${transition}`}>
            <div className="flex-1 overflow-y-auto">
              <PasswordGenerator />
            </div>
            <BottomNav onAddPasswordClick={handleAddPasswordClick} onFoldersClick={handleFoldersClick} onHomeClick={handleHomeClick} onPasswordGeneratorClick={handlePasswordGeneratorClick} onSettingsClick={handleSettingsClick} onLogoutClick={handleLogout} />
          </div>
        );
      case 'settingsView':
        return (
          <div className={`h-full flex flex-col min-h-screen text-neutral-200 overflow-hidden ${transition}`}>
            <div className="flex-1 overflow-y-auto">
              <SettingsView />
            </div>
            <BottomNav onAddPasswordClick={handleAddPasswordClick} onFoldersClick={handleFoldersClick} onHomeClick={handleHomeClick} onPasswordGeneratorClick={handlePasswordGeneratorClick} onSettingsClick={handleSettingsClick} onLogoutClick={handleLogout} />
          </div>
        );
      case 'login':
        return (
          <div className={`h-full flex flex-col min-h-screen text-neutral-200 overflow-hidden ${transition}`}>
            <div className="flex-1 overflow-y-auto">
              <Login onRegisterClick={handleRegisterClick} onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        );
      case 'register':
        return (
          <div className={`h-full flex flex-col min-h-screen text-neutral-200 overflow-hidden ${transition}`}>
            <div className="flex-1 overflow-y-auto">
              <Register onRegisterSuccess={handleRegisterSuccess} />
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <div className={`h-full flex flex-col min-h-screen text-neutral-200 p-10 overflow-hidden ${transition}`}>
            <Header />
            <SearchBar />
            <div className="flex-1 overflow-y-auto">
              <ItemList onPasswordItemClick={handlePasswordItemClick} />
            </div>
            <BottomNav onAddPasswordClick={handleAddPasswordClick} onFoldersClick={handleFoldersClick} onHomeClick={handleHomeClick} onPasswordGeneratorClick={handlePasswordGeneratorClick} onSettingsClick={handleSettingsClick} onLogoutClick={handleLogout} />
          </div>
        );
    }
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      {!showSplash && renderContent()}
    </>
  );
};

export default App;

</exemplo_codigo>

<backend>
Aqui está o código do backend em Rust, acessível através das rotas definidas:

use actix_web::{
    cookie::Key, delete, error, get, middleware::Logger, post, put, web::{self, Json, ServiceConfig}, Result
};
use actix_session::{Session, SessionMiddleware, storage::CookieSessionStore};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};
use shuttle_actix_web::ShuttleActixWeb;
use sqlx::{FromRow, PgPool};

#[post("/register")]
async fn register(user: web::Json<UserNew>, state: web::Data<AppState>) -> Result<Json<User>> {
    let user = sqlx::query_as::<_, User>(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, password"
    )
    .bind(&user.username)
    .bind(&user.password)
    .fetch_one(&state.pool)
    .await
    .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

    Ok(Json(user))
}

#[post("/login")]
async fn login(user: web::Json<UserNew>, state: web::Data<AppState>, session: Session) -> Result<Json<User>> {
    let user_result = sqlx::query_as::<_, User>(
        "SELECT id, username, password FROM users WHERE username = $1 AND password = $2"
    )
    .bind(&user.username)
    .bind(&user.password)
    .fetch_one(&state.pool)
    .await;

    match user_result {
        Ok(user) => {
            session.insert("user_id", user.id).map_err(|e| error::ErrorInternalServerError(e.to_string()))?;
            Ok(Json(user))
        },
        Err(e) => Err(error::ErrorBadRequest(e.to_string())),
    }
}

#[post("/logout")]
async fn logout(session: Session) -> Result<Json<&'static str>> {
    session.clear();
    Ok(Json("Logged out"))
}

#[get("/authenticated")]
async fn is_authenticated(session: Session) -> Result<Json<bool>> {
    if let Some(_user_id) = session.get::<i32>("user_id").map_err(|e| error::ErrorInternalServerError(e.to_string()))? {
        Ok(Json(true))
    } else {
        Ok(Json(false))
    }
}

#[post("/passwords")]
async fn add_password(
    password: web::Json<PasswordNew>,
    state: web::Data<AppState>,
    session: Session,
) -> Result<Json<Password>> {
    // Verificar se o usuário está autenticado
    if let Some(user_id) = session.get::<i32>("user_id").map_err(|e| error::ErrorInternalServerError(e.to_string()))? {
        // Inserir a nova senha no banco de dados associada ao user_id da sessão
        let password = sqlx::query_as::<_, Password>(
            "INSERT INTO passwords (service, username, password, folder, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, service, username, password, folder, user_id"
        )
        .bind(&password.service)
        .bind(&password.username)
        .bind(&password.password)
        .bind(&password.folder)
        .bind(user_id) // Usar o user_id da sessão
        .fetch_one(&state.pool)
        .await
        .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        Ok(Json(password))
    } else {
        // Se o usuário não estiver autenticado, retornar um erro de autorização
        Err(error::ErrorUnauthorized("Unauthorized"))
    }
}

#[get("/passwords")]
async fn list_passwords(state: web::Data<AppState>, session: Session) -> Result<Json<Vec<Password>>> {
    if let Some(user_id) = session.get::<i32>("user_id").map_err(|e| error::ErrorInternalServerError(e.to_string()))? {
        let passwords = sqlx::query_as::<_, Password>(
            "SELECT * FROM passwords WHERE user_id = $1"
        )
        .bind(user_id)
        .fetch_all(&state.pool)
        .await
        .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        Ok(Json(passwords))
    } else {
        Err(error::ErrorUnauthorized("Unauthorized"))
    }
}

#[get("/passwords/folders")]
async fn list_passwords_by_folder(
    state: web::Data<AppState>,
    session: Session,
    query: web::Query<FolderQuery>,
) -> Result<Json<Vec<Password>>> {
    // Verificar se o usuário está autenticado
    if let Some(user_id) = session.get::<i32>("user_id").map_err(|e| error::ErrorInternalServerError(e.to_string()))? {
        // Buscar as senhas do usuário autenticado no banco de dados
        let passwords = sqlx::query_as::<_, Password>(
            "SELECT * FROM passwords WHERE user_id = $1 AND folder = $2"
        )
        .bind(user_id)
        .bind(&query.folder)
        .fetch_all(&state.pool)
        .await
        .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        Ok(Json(passwords))
    } else {
        // Se o usuário não estiver autenticado, retornar um erro de autorização
        Err(error::ErrorUnauthorized("Unauthorized"))
    }
}

#[get("/folders")]
async fn list_folders(
    state: web::Data<AppState>,
    session: Session,
) -> Result<web::Json<Vec<String>>> {
    // Verificar se o usuário está autenticado
    if let Some(user_id) = session.get::<i32>("user_id").map_err(|e| error::ErrorInternalServerError(e.to_string()))? {
        // Buscar as pastas do usuário autenticado no banco de dados
        let folders = sqlx::query_as::<_, Folder>(
            "SELECT DISTINCT folder FROM passwords WHERE user_id = $1"
        )
        .bind(user_id)
        .fetch_all(&state.pool)
        .await
        .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        let folder_names: Vec<String> = folders.into_iter()
            .map(|folder| folder.folder)
            .collect();

        Ok(web::Json(folder_names))
    } else {
        // Se o usuário não estiver autenticado, retornar um erro de autorização
        Err(error::ErrorUnauthorized("Unauthorized"))
    }
}

#[put("/passwords/{id}")]
async fn edit_password(
    path: web::Path<i32>,
    password: web::Json<PasswordUpdate>,
    state: web::Data<AppState>,
    session: Session,
) -> Result<Json<Password>> {
    // Verificar se o usuário está autenticado
    if let Some(user_id) = session.get::<i32>("user_id").map_err(|e| error::ErrorInternalServerError(e.to_string()))? {
        // Verificar se a senha pertence ao usuário autenticado
        let password_exists = sqlx::query(
            "SELECT 1 FROM passwords WHERE id = $1 AND user_id = $2"
        )
        .bind(*path)
        .bind(user_id)
        .fetch_optional(&state.pool)
        .await
        .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        if password_exists.is_none() {
            return Err(error::ErrorUnauthorized("Unauthorized"));
        }

        // Atualizar a senha no banco de dados
        let updated_password = sqlx::query_as::<_, Password>(
            "UPDATE passwords SET username = $1, password = $2, folder = $3 WHERE id = $4 RETURNING id, service, username, password, folder, user_id"
        )
        .bind(&password.username)
        .bind(&password.password)
        .bind(&password.folder)
        .bind(*path)
        .fetch_one(&state.pool)
        .await
        .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        Ok(Json(updated_password))
    } else {
        // Se o usuário não estiver autenticado, retornar um erro de autorização
        Err(error::ErrorUnauthorized("Unauthorized"))
    }
}

#[delete("/passwords/{id}")]
async fn delete_password(
    path: web::Path<i32>,
    state: web::Data<AppState>,
    session: Session,
) -> Result<web::Json<&'static str>> {
    // Verificar se o usuário está autenticado
    if let Some(user_id) = session.get::<i32>("user_id").map_err(|e| error::ErrorInternalServerError(e.to_string()))? {
        // Verificar se a senha pertence ao usuário autenticado
        let password_exists = sqlx::query(
            "SELECT 1 FROM passwords WHERE id = $1 AND user_id = $2"
        )
        .bind(*path)
        .bind(user_id)
        .fetch_optional(&state.pool)
        .await
        .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        if password_exists.is_none() {
            return Err(error::ErrorUnauthorized("Unauthorized"));
        }

        // Deletar a senha do banco de dados
        sqlx::query("DELETE FROM passwords WHERE id = $1")
            .bind(*path)
            .execute(&state.pool)
            .await
            .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        Ok(web::Json("Password deleted"))
    } else {
        // Se o usuário não estiver autenticado, retornar um erro de autorização
        Err(error::ErrorUnauthorized("Unauthorized"))
    }
}

#[shuttle_runtime::main]
async fn main(
    #[shuttle_shared_db::Postgres] pool: PgPool,
) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    sqlx::migrate!()
        .run(&pool)
        .await
        .expect("Failed to run migrations");

    let state = web::Data::new(AppState { pool });
    let secret_key = Key::generate();

    let config = move |cfg: &mut ServiceConfig| {
        cfg.service(
            web::scope("/api/v1")
                .wrap(Logger::default())
                .wrap(
                    SessionMiddleware::builder(CookieSessionStore::default(), secret_key.clone())
                        .build()
                )
                .wrap(
                    Cors::default()
                        .allow_any_origin()
                        .allow_any_method()
                        .allow_any_header()
                )
                .service(register)
                .service(login)
                .service(logout)
                .service(add_password)
                .service(list_passwords)
                .service(list_passwords_by_folder)
                .service(list_folders)
                .service(edit_password)
                .service(delete_password)
                .service(is_authenticated)
                .app_data(state.clone())
        );
    };

    Ok(config.into())
}

#[derive(Clone)]
struct AppState {
    pool: PgPool,
}

#[derive(Serialize, Deserialize, FromRow)]
struct Password {
    pub id: i32,
    pub service: String,
    pub username: String,
    pub password: String,
    pub folder: String,
    pub user_id: i32,
}

#[derive(Serialize, Deserialize)]
struct PasswordNew {
    pub service: String,
    pub username: String,
    pub password: String,
    pub folder: String,
}

#[derive(Serialize, Deserialize)]
struct PasswordUpdate {
    pub username: String,
    pub password: String,
    pub folder: String,
}

#[derive(Serialize, Deserialize, sqlx::FromRow)]
struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
struct UserNew {
    pub username: String,
    pub password: String,
}

#[derive(Deserialize)]
struct FolderQuery {
    folder: String,
}

#[derive(sqlx::FromRow)]
struct Folder {
    folder: String,
}
</backend>
<instrucoes>
Baseado nas informações acima, implemente o frontend do programa SecurePass. Caso necessário, faça perguntas para clarificar qualquer ponto ou obter mais detalhes.
</instrucoes>