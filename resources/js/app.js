import Axios from "axios";

var vm = new Vue({
    el: '#crud',
    data: {
      keeps: [] //Todas las tareas
    },
    methods: {
      getKeeps: function() {
          var urlKeeps = 'tasks';
          axios.get(urlKeeps).then( response => {
            this.keeps = response.data
          });
      }
    }
  });