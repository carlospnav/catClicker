(function(){
  function Cat(info){
    this.name = info.name;
    this.src = info.src;
    this.counter = info.counter;
  }

  function Controller(){}
  Controller.prototype = {
    getCat: function(index){
      return model.cats[index];
    },
    getCats: function(){
      return model.cats;
    },
    getCurrentCat: function(){
      return model.currentCat;
    },
    setCurrentCat: function(cat){
      model.currentCat = cat;
    },
    incrementCurrentCat: function(){
      model.currentCat.counter++;
    },
    editCurrentCat: function(cat){
      if (cat.name)
        model.currentCat.name = cat.name;
      if (cat.src)
        model.currentCat.src = cat.src;
      if (cat.counter)
        model.currentCat.counter = cat.counter;
    },
    populateAdminTool: function(){

    },
    renderCat: function(){
      view.displayView.render(this.getCurrentCat());
    },
    init: function(){
      model.init();
      view.init(this.getCats());
    }
  };

  var model = {
    cats : [],
    currentCat: null,
    init: function(){
      this.cats = [ 
        new Cat({
          name: "Fuzzy",
          src: "images/fuzzy.jpg",
          counter: 0
        }),
        new Cat({
          name: "Jonesy",
          src: "images/jonesy.jpg",
          counter: 0
        }),
        new Cat({
          name: "Lucius",
          src: "images/lucius.jpg",
          counter: 0
        }),
          new Cat({
          name: "Megan",
          src: "images/megan.jpg",
          counter: 0
        }),
        new Cat({
          name: "Cornelius",
          src: "images/cornelius.jpg",
          counter: 0
        })
      ];
    }
  }

  var view = {
    listView: {
      target: document.getElementById('cats-list'),
      render: function(cats){
        var self = this;
        cats.forEach(function(value, index){
           var catNode = document.createElement("li"),
               cat = cats[index];
           catNode.textContent = cat.name;
           catNode.addEventListener('click', function(){
             var visible = view.adminView.tool.classList;
             if (visible.contains('hidden'))
              visible.remove('hidden');
             controller.setCurrentCat(cat);
             view.adminView.populate(cat);
             controller.renderCat();
           });
           self.target.appendChild(catNode);
         });
      }
    },
    displayView: {
      targetTitle: document.getElementById('cat-title'),
      targetImg: document.getElementById('cat-img'),
      render: function(cat, mode){
        if (mode === undefined || mode === 'full-render'){
          this.targetImg.setAttribute('src', cat.src);
        }
        this.targetTitle.textContent = cat.name + ': ' + cat.counter;
      }
    },
    adminView: {
      tool: document.getElementById('admin-tools'),
      controls: document.getElementById('admin-form'),
      button: document.getElementById('admin-button'),
      cancel: document.getElementById('cancel-button'),
      save: document.getElementById('save-button'),
      populate: function(){
        var currentCat = controller.getCurrentCat(),
            catNameTxt = document.getElementById('admin-name'),
            catSrcTxt = document.getElementById('admin-url'),
            catClickTxt = document.getElementById('admin-click');
        catNameTxt.value = currentCat.name;
        catSrcTxt.value = currentCat.src;
        catClickTxt.value = currentCat.counter;      
      },
      render: function(cat){
        this.controls.classList.toggle('hidden');
      }
    },
    clearElements: function(elements){
      for (var i = 0;  i < elements.length; i++){
        elements[i].value = "";
      }
    },
    init: function(cats){

      var targetImg = this.displayView.targetImg,
          targetTitle = this.displayView.targetTitle,
          displayView = this.displayView,
          adminView = this.adminView,
          adminButton = this.adminView.button,
          adminTool = this.adminView.tool,
          saveButton = this.adminView.save,
          cancelButton = this.adminView.cancel;
      
     this.listView.render(cats);

     //Registering Event Listeners.
      adminButton.addEventListener('click', function(){
        adminView.render();
      });

      cancelButton.addEventListener('click', function(e){
        var currentCat = controller.getCurrentCat();
        view.adminView.populate(currentCat);
        adminView.render();
        e.preventDefault();
      });

      saveButton.addEventListener('click', function(e){
        var catName = document.getElementById('admin-name').value, 
            catSrc = document.getElementById('admin-url').value, 
            catCounter = document.getElementById('admin-click').value, 
            cat = new Cat({name: catName, src: catSrc, counter: catCounter }),
            currentCat;
        controller.editCurrentCat(cat);
        currentCat = controller.getCurrentCat();
        adminView.populate(currentCat);
        displayView.render(currentCat, "full-render");
        adminView.render();
        e.preventDefault();
      });

      targetImg.addEventListener('click', function(){
        var currentCat = controller.getCurrentCat();
        if (currentCat !== undefined){
          controller.incrementCurrentCat();
          displayView.render(currentCat);
        }
      });
    }
  }
  var controller = new Controller();
  controller.init();
})();