<h1 align="center">
  ⚡ Smart Home - LIT
</h1>

## ❓ About 
Smart Home - LIT adalah project untuk menampilkan dashboard dan device management di sebuah rumah. Untuk pengembangan, _database_ yang digunakan menggunakan _dummy_ _database_ karena tidak tersambung secara langsung dengan hardware melalui protokol MQTT.

## 💾 Documentation and Repositories
- [UI Wireframe](https://www.figma.com/file/vnzBpOdVkW5COuhIMBC7Kq/UI-Wireframe?node-id=2%3A3&t=rW2Nv1HVIVTVwMqn-0)
- [Backend Repo](https://github.com/mhmd-arif/LIT-smart-home-backend)

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
├── public               
├── src           
│   ├── assets                  # assets files: icons, svg, css, etc
│   ├── components              # components: breadcrumbs, navbar, etc
│   ├── plugins                 # plugins: vuetify, etc
│   ├── router                  # routes folder
│   ├── stores                  # state management using vuex
│   ├── utils                   # contains utility functions
│   ├── views                   # views files: home, about, etc
│   ├── App.vue                 # main file that contains routes and router-view
│   ├── fetchInterceptor.js     # intercept every fetch request
│   ├── main.js                 # Vue App that mounted to index.html and some configuration
├── index.html                  # frontend initialization
├── tailwind.config.js          # config file for tailwind css
├── postcss.config.js           # config file for postcss (correspond with tailwind css)
├── vite.config.js              # config file for vite bundler
├── package.json                # dependency and npm scripts
```


## 👨‍💻 Contributor
- [Saddan Syah Akbar](https://github.com/saddansyah)
- [Muhammad Arif Hidayat](https://github.com/mhmd-arif)
