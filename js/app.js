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

  // var controller = {
  //   getCat: function(index){
  //     return model.cats[index];
  //   },
  //   getCats: function(){
  //     return model.cats;
  //   },
  //   getCurrentCat: function(){
  //     return model.currentCat;
  //   },
  //   setCurrentCat: function(cat){
  //     model.currentCat = cat;
  //   },
  //   renderCat: function(){
  //     var cat = getCurrentCat();
  //     console.log(cat);
  //     view.displayView.render(getCurrentcat());
  //   },
  //   init: function(){
  //     model.init();
  //     view.init(this.getCats());
  //   }
  // }

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
             controller.setCurrentCat(cat);
             controller.renderCat();
           });
           self.target.appendChild(catNode);
         });
      }
    },
    displayView: {
      targetTitle: document.getElementById('cat-title'),
      targetImg: document.getElementById('cat-img'),
      render: function(cat){
        this.targetTitle.textContent = cat.name;
        this.targetImg.setAttribute('src', cat.src);
      //   var target = view.displayView.target,
      //       title = document.createElement('h3');
      //   redrawTitle();
      //   var img = document.createElement('img');
      //   img.setAttribute('src', cat.src);
      //   img.setAttribute('alt', cat.name + ' the cat.');
      //   img.addEventListener('click', function(){
      //     cat.counter++;
      //     redrawTitle();
      //   });
      //   target.appendChild(title);
      //   target.appendChild(img);
      //   function redrawTitle(){
      //     title.textContent = cat.name + ': ' + cat.counter;
      //   }
      }
    },
    init: function(cats){
      // this.listView.render.call(view.displayView, cats);
      this.listView.render(cats);
    }
  }
  var controller = new Controller();
  controller.init();
})();