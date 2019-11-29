new Vue({
    el: '#crud',
    created: function() {
      this.getKeeps();
    },
    data: {
      keeps: [], //Todas las tareas
      newKeep: [],
      fillKeep: {'id': '', 'keep': ''},//Crea esa variablr para evitar errores. Esta variable se le asignaran sus atributos con editKeep
      errors: []
    },
    methods: {
      getKeeps: function() {
          var urlKeeps = 'tasks';
          axios.get(urlKeeps).then( response => {
            this.keeps = response.data
          });
      },
      updateKeep: function(id) {
        //alert('update keep');
        var url = 'tasks/' + id;
        axios.put(url, this.fillKeep).then(response =>{
          this.getKeeps();
          this.fillKeep = {'id': '', 'keep': ''};
          this.errors   = [];
          $('#edit').modal('hide');
          toastr.success('Tarea actualizada con exito');
        }).catch(error => {
            this.errors = error.response.data
        });
      },
      editKeep: function(keep) {
        this.fillKeep.id   = keep.id; //Asiganmos valores a la variable fillKeep que se usa en el modal
        this.fillKeep.keep = keep.keep;
        $('#edit').modal('show');
      },
      deleteKeep: function(keep) {
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