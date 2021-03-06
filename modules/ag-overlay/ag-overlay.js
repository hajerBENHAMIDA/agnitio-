app.register("ag-overlay", function() {

  return {
    publish: {
        width: "80%",
        height: "80%",
        noBackground: false,
        noCloseBtn: false,
        content: "No content available",
        existe: false
    },
    events: {
        "tap": "close"
    },
    states: [
        {
            id: "ag-overlay-open",
            onEnter: function() {

              var slide;
              app.lock();
              if (this.slideId) {
                  setTimeout(function() {
                    slide = app.slide.get(this.slideId);
                    if (slide && slide.onEnter) slide.onEnter(app.dom.get(this.slideId));
                  }.bind(this),300);
              }
              app.trigger('open:overlay', {id: this.id, slideId: this.slideId}); 

            },
            onExit: function() {
              var slide;
              app.trigger('close:overlay', {id: this.id, slideId: this.slideId});
              app.unlock();
              if (this.slideId) {
                slide = app.slide.get(this.slideId);
                if (slide && slide.onExit) slide.onExit(app.dom.get(this.slideId));
                app.slide.remove(this.slideId, true);
              }
            }
        }
    ],
    close: function(event) {
        if (event.target.classList.contains('ag-overlay-close')) {
          $(".ag-overlay-x").removeClass("x-overlay");

            this.reset();
        }
        if (event.target.classList.contains('ag-close-x')) {
          this.reset();

      }
      if (event.target.classList.contains('x-overlay-rcp')) {
        this.reset();
    }
    },
    // Open provided HTML
    open: function(content) {
        content = content || this.props.content;
        console.log("open");
        this.props.existe=true;
        //test marwen & hajer
        var x = $("#overlay > .ag-overlay-x");
        x.hide();
                     

        if (content) {
            this.$('.ag-overlay-content')[0].innerHTML = content;
        }
        this.goTo('ag-overlay-open');
    },
    // Load a slide into the overlay
    load: function(slideId) {
      console.log("load");
      this.props.existe=false;  
      var x = $("#overlay > .ag-overlay-x");
      x.show();

    
      this.slideId = slideId;
      this.$('.ag-overlay-content')[0].innerHTML = "";
      // Need to remove slide if already loaded in presentation
      app.slide.remove(slideId, true);
      app.dom.insert([{id: slideId}], false, this.$('.ag-overlay-content')[0]);
      this.goTo('ag-overlay-open');
      // Fetch the slide but don't render it yet
      // app.slide.load(slideId).then(function(data) {
      //   console.log(data);
      //   this.slideId = slideId;
      //   app.dom.render(slideId, this.$('.ag-overlay-content')[0]);
      //   this.goTo('ag-overlay-open');
      // }.bind(this));
      // app.dom.insert([slideId], false, this.$('.ag-overlay-content')[0]);
      // this.slide = app.slide.get(slideId);
      // this.slideEl = app.dom.get(slideId);
    },
    setDimensions: function(width, height) {
      var contentEl = this.$('.ag-overlay-content')[0];
      var closeBtn = this.$('.ag-overlay-x')[0];
      var wMargin;
      var hMargin;
      var wUnit = "%";
      var hUnit = "%";
      // Assume percentage
      if (width < 101) {
        wMargin = (100 - width) / 2;
      }
      // otherwise treat as pixels
      {
        // Only supports % for now
      }
      // Assume percentage
      if (height < 101) {
        hMargin = (100 - height) / 2;
      }
      // otherwise treat as pixels
      {
        // Only supports % for now
      }

      if (contentEl) {
        contentEl.style.top = hMargin + hUnit;
        contentEl.style.bottom = hMargin + hUnit;
        contentEl.style.left = wMargin + wUnit;
        contentEl.style.right = wMargin + wUnit;
      }
      if (contentEl) {
        closeBtn.style.top = (hMargin - 1) + hUnit;
        closeBtn.style.right = (wMargin - 1) + wUnit;
      }

    },
    onRender: function(el) {
      var content = this.el.innerHTML;
      var html = '';
      var width = parseInt(this.props.width);
      var height = parseInt(this.props.height);
      if (!this.props.noBackground) {
        html = '<div class="ag-overlay-background ag-overlay-close"></div>';
      }
          html += '<div class="ag-overlay-content">';
              html += content;
          html += '</div>';
      if (!this.props.noCloseBtn) {
        html += '<div class="ag-overlay-x ag-overlay-close"></div>';
      }
                     


      // html += '</div>';
      this.el.innerHTML = html;
      this.setDimensions(width, height);
    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {


    },
    onExit: function(el) {

    }
  }

});