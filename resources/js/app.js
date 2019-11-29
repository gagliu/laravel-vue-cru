new Vue({
    el: '#crud',
    created: function() {
      this.getKeeps();
    },
    data: {
      keeps: [] //Todas las tareas
    },
    methods: {
      getKeeps: function() {
          var urlKeeps = 'tasks';
          axios.get(urlKeeps).then( response => {
            this.keeps = response.data
          });
      },
      deleteKeep: function(keep) {
        //alert('eliminar');
        //alert(keep.id);
        var url = 'tasks/' + keep.id;
        axios.delete(url).then(response => {
            this.getKeeps(); //Despues de eliminar hay que volver a cargar el listado
        });
      }
    }
  });