<h1 align="center">
  ⚡ Smart Home - LIT
</h1>
<p align="center">[Saddan Syah Akbar](https://github.com/saddansyah) | [Muhammaf Arif Hidayat](https://github.com/mhmd-arif)</p>


## ❓ About 
Smart Home - LIT adalah project untuk menampilkan dashboard dan device management di sebuah rumah. Untuk pengembangan, _database_ yang digunakan menggunakan _dummy_ _database_ karena tidak tersambung secara langsung dengan hardware melalui protokol MQTT.

## 💾 Documentation
- [UI Wireframe](https://www.figma.com/file/vnzBpOdVkW5COuhIMBC7Kq/UI-Wireframe?node-id=2%3A3&t=rW2Nv1HVIVTVwMqn-0)
- Postman API Documentation

<hr/>

## ⚙ Setting Up Project
- Install required dependencies:
```````````
npm install
```````````
- Run the program (development service):
```````````
npm run dev
```````````
- Build to static files:
``````````
npm run build
``````````

## 📁 Folder Structure
```
- public               
- src           
  - assets              # assets files: icons, svg, css, etc
  - components          # components: breadcrumbs, navbar, etc
  - plugins             # plugins: vuetify, etc
  - router              # routes folder
  - stores              # state management using vuex
  - views               # views files: home, about, etc
  - App.vue             # main file that contains routes and router-view
  - main.js             # Vue App that mounted to index.html
- index.html            # server initialization
- tailwind.config.js    # config file for tailwind css
- postcss.config.js     # config file for postcss (coresponding with tailwind css)
- vite.config.js        # config file for vite bundler
- package.json          # dependency and npm scripts
```
