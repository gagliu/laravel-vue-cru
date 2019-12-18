new Vue({
    el: '#crud',
    created: function() {
        this.getKeeps();
    },
    data: {
        keeps: [], //Todas las tareas
        pagination: {
            'total': 0,
            'current_page': 0,
            'per_page': 0,
            'last_page': 0,
            'from': 0,
            'to': 0
        },
        newKeep: [],
        fillKeep: {'id': '', 'keep': ''},//Crea esa variable para evitar errores. Esta variable se le asignaran sus atributos con editKeep
        errors: [],
        offset: 3 //3 botones de paginacion antes y 3 botones despues de la paginacion activa
    },
    computed: { 
        isActived: function() { //Resalta el numero de la pagina actual
            return this.pagination.current_page;
        },
        pagesNumber: function() {
            if (!this.pagination.to) { //Si to no tiene valores, no retonar numero de pagina
                return [];
            }

            var from = this.pagination.current_page - this.offset;
            if (from < 1) {
                from = 1;
            }

            var to = from + (this.offset * 2)
            if (to >= this.pagination.last_page) {
                to = this.pagination.last_page;
            }

            var pagesArray = [];
            while (from <= to) {
                pagesArray.push(from);
                from++;
            }
            return pagesArray;
        }
    },
    methods: { //Methods define funciones
        getKeeps: function(page) {
            var urlKeeps = 'tasks?page='+page;
            axios.get(urlKeeps).then( response => {
              this.keeps = response.data.tasks.data //dentro de la respuesta data buscar la variable tasks y obtener los datos de esta
              this.pagination = response.data.pagination
            });
        },
        updateKeep: function(id) {
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
        },
        changePage: function(page) {
            this.pagination.current_page = page;
            this.getKeeps(page);
        }
    }
  });