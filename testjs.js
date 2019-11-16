$(".buttons").mouseover(function(){
    $(this).addClass("animated jello");
  });
  
  $(".buttons").mouseout(function(){
    $(this).removeClass("animated jello");
  });
  

  setTimeout(function() {
    $(".loader").css("display", "none");
    loaded.play();
  }, 2500);
  
  width = $(window).width();
  
  if (width <= 700) {
    $(".name").click(function() {
      $(".intro").css("right", "0");
      // $(".text").css("transform", "translateX(20px)")
      $(".wrapper").css("z-index", "20");
    });
  
    $(".close").click(function() {
      $(".intro").css("right", "-1000px");
    });
  
  }
  
  $("#arrow").click(function() {
    open.play();
    about.play();
  
    if (width <= 700) {
      $(".wrapper").css("z-index", "20");
      $(".intro").css("transform", "translateX:100px")
    }
  });
  
  $(".close").click(function() {
    close.play();
  })
  
  var loaded = anime({
    targets: '.name',
    scale: [{
      value: 3,
      duration: 100,
      elasticity: 100
    }, {
      value: 1,
      duration: 500,
      elasticity: 100
    }],
    duration: 4000,
    autoplay: false,
  
  });
  
  var open = anime({
    targets: '.intro',
    translateX: -1000,
    duration: 1000,
    autoplay: false
  });
  
  var close = anime({
    targets: '.intro',
    translateX: 1800,
    duration: 500,
    autoplay: false,
  });
  
  var about = anime({
    targets: '.text',
    translateX: [{
      value: -200,
      duration: 100,
      elasticity: 100
    }, {
      value: 0,
      duration: 500,
      elasticity: 100
    }],
    delay: 200
  });


Vue.component('ti-button-splatter', {
props: ['text'],
data: function() {
    return {
    splatters: []
    }
},
template: `
<button
class="btn-splatter"
v-on:click="makeSplatter(event)"
>
{{text}}
<div
    v-for="splatter, i in splatters"
    v-bind:class="splatter.type"
    v-bind:style="splatter.style"
    v-bind:ref="createRef(i)"
></div>
</button>
`,
methods: {
    createRef: function(i) {
    return 'splatter-' + i;
    },
    getSizeEm: function(s) {
    if (s === 0) {
        return (1 / 2) + 'em';
    } else if (s === 1) {
        return (1.5 / 2) + 'em';
    } else if (s === 2) {
        return (1.8 / 2) + 'em';
    } else {
        return 0;
    }
    },
    createToXPos: function(tb, w, h, s) {
    let positionStyle  = {style: {}};
    let randomPosition = (Math.floor(Math.random() * w));
    let fixedPosition  = ((tb === 0) ? h : 0);

    positionStyle.style.top  = 'calc(' + fixedPosition + 'px - ' + s + ')';
    positionStyle.style.left = 'calc(' + randomPosition + 'px - ' + s + ')';

    return positionStyle;
    },
    createToYPos: function(lr, w, h, s) {
    let positionStyle  = {style: {}};
    let randomPosition = (Math.floor(Math.random() * h));
    let fixedPosition  = ((lr === 0) ? w : 0);

    positionStyle.style.left = 'calc(' + fixedPosition + 'px - ' + s + ')';
    positionStyle.style.top  = 'calc(' + randomPosition + 'px - ' + s + ')';

    return positionStyle;
    },
    createsplatter: function(el, count, types, w, h) {
    for (let i = 0; i < count; i++) {
        let type = Math.floor(Math.random() * 3);
        let xOrY = Math.round(Math.random());
        let tblr = Math.round(Math.random());
        let splt = null;
        let sz   = Math.random() + 0.5;

        if (xOrY === 0) {
        splt = this.createToXPos(tblr, w, h, this.getSizeEm(type));
        } else {
        splt = this.createToYPos(tblr, w, h, this.getSizeEm(type));
        }

        splt.type  = types[type];
        splt.scale = sz;

        splt.style.display = 'none';
        splt.style.transform = 'scale(' + sz + ')';

        if (splt !== null) {
        this.splatters.push(splt);
        }
    }
    },
    explodeSplatter: function() {
    for (var i = 0; i < this.splatters.length; i++) {
        if (this.splatters[i].animationEnd === true) {
        continue;
        }

        if (typeof this.splatters[i].moving === 'undefined') {
        let el = this.$refs['splatter-' + i];
        let an = Math.floor(Math.random() * 359) + 1;

        this.splatters[i].style.display = 'block';

        this.splatters[i].moving = true;

        let psY = (Math.sin(an) * 3) + 'em';
        let psX = (Math.cos(an) * 3) + 'em';
        let scl = this.splatters[i].scale;

        TweenLite.to(el, 0.8, {
            transform:
            'translate(' + psX + ', ' + psY + ') rotate(720deg) scale(0)'
        }).eventCallback('onComplete', () => {
            el.dataset.animationEnd = true;
        });
        }
    }
    },
    makeSplatter: function(e) {
    let el    = e.target;
    let count = Math.floor(Math.random() * 4) + 5;
    let types = ['splatter-round', 'splatter-ring', 'splatter-star'];
    let w     = el.clientWidth;
    let h     = el.clientHeight;

    this.createsplatter(el, count, types, w, h);
    }
},
watch: {
    splatters: function(newData, oldData) {
    setTimeout(() => {
        this.explodeSplatter();
    }, 1);
    }
}
});

// -----

var app = new Vue({
el: '#app'
});
