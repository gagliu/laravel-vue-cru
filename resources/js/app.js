new Vue({
    el: '#crud',
    created: function() {
      this.getKeeps();
    },
    data: {
      keeps: [], //Todas las tareas
      newKeep: [],
      errors: []
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
            toastr.success('Eliminado correctamente');
        });
      },
      createKeep: function() {
          var url = 'tasks';
          axios.post(url, {
              keep: this.newKeep
          }).then(response => {
              this.getKeeps();
              this.newKeep = ''; //Volver a mandar la variable sin ningun valor aparentemente
              this.errors = [];
              $('#create').modal('hide');
              toastr.success('Nueva tarea creada con exito');          
          }).catch(error => {
              this.errors = error.response.data
          })
      }
    }
  });