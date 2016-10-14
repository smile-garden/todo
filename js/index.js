$(function(){
    var iteminfo=[];
    if(!localStorage.todos){
        localStorage.todos=JSON.stringify(iteminfo);
    }else{
        iteminfo=JSON.parse(localStorage.todos);
        rendar();
    }

    //添加
    var zhezhao=$('.zhezhaobox');
    var shuru=$('.zhezhaobox .shuru');
    var button=$('.zhezhaobox .button');
    var addsj=$('.zhezhaobox .addsj')
    var toollist=$('.zhezhaobox .toollist');
    var dibu=$('.zhezhaobox .dibutool');
    var list=$('.zhezhaobox .toollist li');
    var quxiao=$('.zhezhaobox .quxiao');
    var add=$('.header .add');
    var a='';
    shuru.on('keyup',function(){
        return a=shuru.val()
    })
    add.on('click',function(){
        shuru.val('');
        zhezhao.addClass('xianxianz');
        addsj.addClass('addsjzz');
    })
    button.on('click',function(){
        if(!a){
            alert('请输入')
            return
        }
        iteminfo.push({item:a,status:0,del:0});
        localStorage.todos=JSON.stringify(iteminfo);
        zhezhao.removeClass('xianxianz');
        addsj.removeClass('addsjzz');
        rendar();
    })
    function rendar(){
        $('.item-list').empty();
        $.each(iteminfo,function(i,v){
            $('<li class="item"><div class="iteminner"><div class="name">'+v.item+'</div><div class="delete icon-shanchu"></div><div class="delbox icon-shanchu1"></div></div></li>').appendTo('.item-list');
            if(v.status){
                $('.iteminner').addClass('xian');
                $('.delete').addClass('del');
                $('.item  .name').css({color:"#aaa"})
            }else{
                return;
            }
        })
    }
    var i=0;
    function move(){
        i++;
    }
    $('.item-list').on('touchstart','.item',function(e){
       j=$(this).index();
        left=e.originalEvent.changedTouches[0].pageX;
        t=setInterval(move,10);
    })
    $('.item-list').on('touchmove','.item',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        var x=n-left;
        if(x<-50){
            $(this).css({transform:"translate3d("+x+"px,0,0)"});
        }else if(x>-100){
            $(this).css({transform:"translate3d(0,0,0)"});
        }
    })
    $('.item-list').on('touchend','.item',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        var a=$(this).index();
        if(i>50){
            i=0;
            zhezhao.addClass('xianxianz');
            dibu.addClass('dibuzz');
            console.log(j);
        }
        if(n<left&&(left-n>=40)){
            $(this).find('.delete').addClass('del');
            $(this).find('.iteminner').addClass('xian');
            $(this).find('.name').css({color:"#aaa"});
            $(this).find('.delbox').addClass('dbox');
            iteminfo[a].status=1;
            localStorage.todos=JSON.stringify(iteminfo);
        }
        clearInterval(t)
    })

    function shanchu2(){
        $('.item').eq(j).addClass('feili');
        zhezhao.removeClass('xianxianz');
        dibu.removeClass('dibuzz');
        $('.item').eq(j).delay(400).queue(function(){
            $('.item').eq(j).remove().dequeue();
        });
        iteminfo.splice(j,1);
        localStorage.todos=JSON.stringify(iteminfo);
    }
    $('.item-list').on('click','.delbox',function(){
        var i=$(this).closest('li').index();
        $(this).closest('li').addClass('feili');
        $(this).closest('li').delay(800).queue(function(){
            $(this).closest('li').remove().dequeue();
        });
        iteminfo.splice(i,1);
        localStorage.todos=JSON.stringify(iteminfo);
    });
    list.eq(3).on('click',shanchu2);
    list.eq(2).on('click',function(){
        $('.item').remove();
        iteminfo=[];
        zhezhao.removeClass('xianxianz');
        dibu.removeClass('dibuzz');
        localStorage.todos=JSON.stringify(iteminfo);
    })
    quxiao.on('click',function(){
        zhezhao.removeClass('xianxianz');
        dibu.removeClass('dibuzz');
    })
    
    $('.nav').on('touchstart',function(){
        $('.denglu').removeClass('qule').addClass('huilai');
    })
    $('.denglu').on('touchstart',function(e){
        dlleft=e.originalEvent.changedTouches[0].pageX;
    })
    $('.denglu').on('touchend',function(e){
        var hl=e.originalEvent.changedTouches[0].pageX;
        if(hl<dlleft&&(dlleft-hl>50)){
            $(this).removeClass('huilai').addClass('qule')
        }
    })
})
