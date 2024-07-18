use keyring::Entry;
use tauri::Manager;
use tauri::{command, generate_handler};

#[command]
fn save_key(service: &str, username: &str, key: &str) -> Result<(), String> {
    let entry: Entry = Entry::new(service, username);
    entry
        .set_password(key)
        .map_err(|e: keyring::Error| e.to_string())
}

#[command]
fn get_key(service: &str, username: &str) -> Result<String, String> {
    let entry: Entry = Entry::new(service, username);
    entry
        .get_password()
        .map_err(|e: keyring::Error| e.to_string())
}

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(
            |app: &tauri::AppHandle, argv: Vec<String>, cwd: String| {
                println!("{}, {argv:?}, {cwd}", app.package_info().name);

                app.emit_all("single-instance", Payload { args: argv, cwd })
                    .unwrap();
            },
        ))
        .invoke_handler(generate_handler![save_key, get_key])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
