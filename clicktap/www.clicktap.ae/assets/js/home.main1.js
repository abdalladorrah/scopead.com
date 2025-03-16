(function($) {



    gsap.registerPlugin(ScrollTrigger);



    $(window).on('load', function(){

        heroScripts();

        funScreen2();

        funScreen3();

        funcScreen4();

        funScreen5();

        funScreen6(); 

        funScreen7();
        testimonial_scren();
        $(".lines__el").css('opacity',1);

    }); 





    // HEADER SCRIPTS

    var heroHeight = $(".hero-area").innerHeight() * 2; 



    $(window).scroll(function() {

    if ($(this).scrollTop() > heroHeight){  

        $('.header-area').addClass("active-header");

      }

      else{

        $('.header-area').removeClass("active-header");

      }

    });



    function heroScripts(){ 



        var RoundedStroke = $(".hero-area .hero-right-lines .rounded svg path"); 

        var RightStroke = $(".hero-area .hero-right-lines .line-to-right svg path"); 

        // var StrokeLength = RoundedStroke.getTotalLength();

        

        gsap.set([RoundedStroke, RightStroke], { 

            drawSVG:"0%"

        })

        gsap.set(".hero-left-line .main-line, .hero-right-lines .left-line .main-line", {

            width:"0%"

        })

        gsap.set(".hero-area .hero-right-lines .bottom-line .main-line", {

            height:"0%"

        })



        function heroAnimation(mobileDevice){



            var heroHeight = $(".hero-area").innerHeight();

            var endPinVal = heroHeight * 2;



            var hero1Tl = gsap.timeline({

                scrollTrigger:{

                    trigger:".hero-area",

                    start:"top 0%",

                    end: ()=>{

                        return `+=${endPinVal}`;

                    }, 

                    scrub:true,  

                    pin:true,

                    pinType:'fixed',

                    // markers:{

                    //     startColor:"#fff",

                    //     endColor:"#fff"

                    // }

                } 

            })

            .to(".hero-left-line .main-line", {

                width:"100%", 

                ease:"none",

                duration:2

            }).to(".hero-right-lines .left-line .main-line", {

                width:"100%",

                ease:"none",

                duration:2

            }).to(RoundedStroke, 1, {

                drawSVG:"100%",

                ease:"none"

            }); 





            var hero2Tl = gsap.timeline({

                scrollTrigger:{

                    trigger:".hero-area .hero-right-lines .bottom-line",

                    start:()=>{

                        return `+=${endPinVal} ${ 

                            mobileDevice ? (heroHeight - $(".hero-area .hero-right-lines .bottom-line").innerHeight()) - $(".hero-area .hero-right-lines .line-to-right").innerHeight()

                            : (heroHeight - $(".hero-area .hero-right-lines .bottom-line").innerHeight())

                        }`;

                    },

                    end: ()=>{

                        return `${endPinVal + $(".hero-area .hero-right-lines .bottom-line").innerHeight()} 70%`; 

                    },  

                    scrub:true, 

                    // markers:{

                    //     startColor:"blue", 

                    //     endColor:"blue"

                    // }

                }

            }).to(".hero-area .hero-right-lines .bottom-line .main-line", {

                height:"100%"

            })

            if(mobileDevice){

                hero2Tl.to(RightStroke, {

                    drawSVG:"-100%"

                })

            }

        } 



        ScrollTrigger.matchMedia({

            "(min-width:992px)":function(){

                heroAnimation(mobileDevice = false);

            },

            "(max-width:991px)": function() {

                heroAnimation(mobileDevice = true);

            }

        })



    }





    function funScreen2(){



        var line1 = $(".screen2_content .line-wrapper .line-1 svg path");

        var line2 = $(".screen2_content .line-wrapper .line-2 .main-line"); 

        var line3 = $(".screen2_content .line-wrapper .line-3 svg path");

        var line4 = $(".screen2_content .line-wrapper .line-4 .main-line");

        var line4Child = $(".screen2_content .line-wrapper .line-4-child .main-line");

        var line5 = $(".screen2_content .line-wrapper .line-5 .main-line");

        var line6 = $(".screen2_content .line-wrapper .line-6 svg path");

        var line7 = $(".screen2_content .line-wrapper .line-7 .main-line");



        gsap.set([line2, line5, line4Child], {

            width:"0%"

        })

        gsap.set([line4, line7], {

            height:"0%"

        })

        gsap.set([line1,line3,line6], {

            drawSVG:"0%"

        })

        gsap.set([line1], { 

            drawSVG:"0%"

        })



        function screen2_animation(mobileDevice){ 

            var s2tl = gsap.timeline({

                scrollTrigger:{

                    trigger:".screen2_content",

                    start:"top 70%",

                    end:"bottom 70%", 

                    scrub:true,

                    // markers:{ 

                    //     startColor:"#fff", 

                    //     endColor:"blue"

                    // }

                }

            });



            if(!mobileDevice){

                s2tl.to(line1, { drawSVG:"-100%" })

            }



            s2tl

            .to(line2, { width:"100%" })

            .to(line3, { drawSVG:"100%" })

            .to(line4, { height:"100%" })

            .to(line4Child, { width:"100%" })

            .to(line5, { width:"100%" })



            if(!mobileDevice){

                s2tl

                .to(line6, { drawSVG:"100%" })

                .to(line7, { height:"100%" })

            }



        }



        ScrollTrigger.matchMedia({

            "(min-width:992px)":function(){

                screen2_animation(mobileDevice = false);

            },

            "(max-width:991px)": function() {

                screen2_animation(mobileDevice = true);

            }

        })

    }





    function funScreen3() {

 

        var line1 = $(".screen3_content .line-1 .main-line");

        var line2 = $(".screen3_content .line-2 svg path");

        var line3 = $(".screen3_content .line-3 .main-line");

        var line4chaild1 = $(".screen3_content .line-4 .child-3 svg path");

        var line4chaild2 = $(".screen3_content .line-4 .child-2 .main-line");

        var line4chaild3 = $(".screen3_content .line-4 .child-1 svg path");

        var line5 = $(".screen3_content .line-5 .main-line");

        var line6Child1 = $(".screen3_content .line-6 .child-1 svg path");

        var line6Child2 = $(".screen3_content .line-6 .child-2 .main-line"); 

        var line6Child3 = $(".screen3_content .line-6 .child-3 svg path");

        var line7 = $(".screen3_content .line-7 .main-line");

        var line8 = $(".screen3_content .line-8 svg path");

        var line9 = $(".screen3_content .line-9 .main-line"); 

        var line10 = $(".screen3_content .line-10 svg path");



        var line1Sm = $(".screen3_content .line-sm-1 svg path");

        var line2Sm = $(".screen3_content .line-sm-2 .main-line");

        var line3Sm = $(".screen3_content .line-sm-3 svg path");

        var line4Sm = $(".screen3_content .line-sm-4 .main-line");

        var line5Sm = $(".screen3_content .line-sm-5 svg path");

        var lineSecTitle = $(".screen3_content .line-title .main-line");



        gsap.set([line1,line4chaild2,line4Sm,line6Child2], {

            height:"0%"

        });



        gsap.set([line3,line5, line7, line9,line2Sm,lineSecTitle], { 

            width:"0%"

        });



        gsap.set([line2,line4chaild1,line4chaild3,line8,line10,line1Sm,line3Sm, line5Sm,line6Child1,line6Child3], { 

            drawSVG:"0%"

        });



        ScrollTrigger.matchMedia({

            "(min-width:992px)":function(){

                gsap.timeline({

                    scrollTrigger:{

                        trigger:".screen3_content",

                        start:"top 70%",

                        end:"bottom 70%", 

                        scrub:true,

                        // markers:{ 

                        //     startColor:"#fff", 

                        //     endColor:"blue"

                        // }

                    }

                })

                .to(line1, {

                    height:"100%"

                })

                .to(line2, {

                    drawSVG:"-100%"

                })

                .to(line3, {

                    width:"100%"

                })

                .to(line4chaild1, {

                    drawSVG:"100%"

                }) 

                .to(line4chaild2, {

                    height:"100%"

                }) 

                .to(line4chaild3, {

                    drawSVG:"-100%"

                }) 

                .to(line5, {

                    width:"100%"

                }) 

                .to(line6Child1, {

                    drawSVG:"100%"

                }) 

                .to(line6Child2, {

                    height:"100%"

                }) 

                .to(line6Child3, {  

                    drawSVG:"-100%"

                }) 

                .to(line7, {

                    width:"100%"

                })

                .to(line8, {

                    drawSVG:"100%"

                })

                .to(line9, {

                    width:"100%"

                })

                .to(line10, {

                    drawSVG:"100%"

                })    

            },

            "(max-width:990px)":function(){

                gsap.timeline({

                    scrollTrigger:{

                        trigger:".screen3_content",

                        start:"top 40%",

                        end:"bottom 70%", 

                        scrub:true,

                        // markers:{ 

                        //     startColor:"#fff", 

                        //     endColor:"blue"

                        // }

                    }

                })

                .to(lineSecTitle, {

                    width:"100%",

                    duration:2

                }) 

                .to(line1Sm, {

                    drawSVG:"100%"

                })

                .to(line2Sm, {

                    width:"100%"

                })

                .to(line3Sm, {

                    drawSVG:"100%"

                })

                .to(line4Sm, {

                    height:"100%"

                })

                .to(line5Sm, { 

                    drawSVG:"100%"

                })

                

            }

        })



    }



    function funcScreen4(){



        var line1 = $(".screen4_content .line-wrapper .line-1 svg path");

        var line2 = $(".screen4_content .line-wrapper .line-2 .main-line");

        var line3 = $(".screen4_content .line-wrapper .line-3 svg path");

        var line4 = $(".screen4_content .line-wrapper .line-4 .main-line");

        var line5 = $(".screen4_content .line-wrapper .line-5 svg path");

        var line6 = $(".screen4_content .line-wrapper .line-6 .main-line");

        var line7 = $(".screen4_content .line-wrapper .line-7 svg path");

        var line8 = $(".screen4_content .line-wrapper .line-8 .main-line");

        var line9 = $(".screen4_content .line-wrapper .line-9 svg path");

        var line10 = $(".screen4_content .line-wrapper .line-10 .main-line");

        var line11 = $(".screen4_content .bottom-line-wrap .line-11 svg path");

        var line12 = $(".screen4_content .bottom-line-wrap .line-12 .main-line");

        var line13 = $(".screen4_content .bottom-line-wrap .line-13 svg path");



        var lineSm11 = $(".screen4_content .line-sm-11 svg path");

        var lineSm12 = $(".screen4_content .line-sm-12 .main-line");

        var lineSm3 = $(".screen4_content .line-wrapper .line-3 .sm-svg path");

        var lineSm5 = $(".screen4_content .line-wrapper .line-5 .sm-svg path");

        var lineSm7 = $(".screen4_content .line-wrapper .line-7 .sm-svg path");

        var lineSm9 = $(".screen4_content .line-wrapper .line-9 .sm-svg path");



        gsap.set([line2,line4,line6,line8,line10,line12,lineSm12], {  

            width:"0%"

        });



        gsap.set([line1,line3,line5,line7,line9,line11,line13,lineSm11], {

            drawSVG:"0%"

        });





        ScrollTrigger.matchMedia({

            "(min-width:992px)":function(){

                gsap.set(".screen4_content .right-image img", { 

                    x:350 

                })

                gsap.timeline({

                    scrollTrigger:{ 

                        trigger:".screen4_content .right-image",

                        start:"top 100%", 

                        end:"95% 100%", 

                        scrub:1.5,

                        // markers:{ 

                        //     startColor:"#fff", 

                        //     endColor:"blue"

                        // } 

                    }

                }).to(".screen4_content .right-image img", { 

                    x:"0"

                });

                gsap.timeline({

                    scrollTrigger:{

                        trigger:".screen4_content",

                        start:"top 70%",

                        end:"bottom 70%", 

                        scrub:true,

                        // markers:{ 

                        //     startColor:"#fff", 

                        //     endColor:"blue"

                        // }

                    }

                })

                .to(line1, 1, {

                    drawSVG:"-100%"

                })

                .to(line2, 1, {

                    width:"100%"

                })

                .to(line3, 1, {

                    drawSVG:"-100%"

                })

                .to(line4, 1, {

                    width:"100%"

                })

                .to(line5, 1, {

                    drawSVG:"-100%"

                })

                .to(line6, 1, {

                    width:"100%"

                })

                .to(line7, 1, {

                    drawSVG:"-100%"

                })

                .to(line8, 1, {

                    width:"100%"

                })

                .to(line9, 1, {

                    drawSVG:"-100%"

                })

                .to(line10, 1, {

                    width:"100%"

                })

                .to(line11, 1, {

                    drawSVG:"100%"

                })

                .to(line12, 1, {

                    width:"100%"

                })

                .to(line13, 1, { 

                    drawSVG:"-100%"

                })

                

            },

            "(max-width:990px)":function(){



                gsap.set(".screen4_content .right-image img", { 

                    x:350 

                })

                gsap.timeline({

                    scrollTrigger:{ 

                        trigger:".screen4_content .right-image",

                        start:"-40% 100%", 

                        end:"95% 100%",    

                        scrub:1.5, 

                        // markers:{ 

                        //     startColor:"#fff", 

                        //     endColor:"blue"

                        // } 

                    }

                }).to(".screen4_content .right-image img", { 

                    x:"0"

                });



                gsap.timeline({

                    scrollTrigger:{

                        trigger:".screen4_content",

                        start:"top 70%",

                        end:"70% 70%",  

                        scrub:true,

                        // markers:{ 

                        //     startColor:"#fff", 

                        //     endColor:"blue"

                        // }

                    }

                })

                .to(line2, 1, {

                    width:"100%"

                })

                .to(lineSm3, 1, {

                    drawSVG:"100%"

                })

                .to(line4, 1, {

                    width:"100%"

                })

                .to(lineSm5, 1, {

                    drawSVG:"100%"

                })

                .to(line6, 1, {

                    width:"100%"

                })

                .to(lineSm7, 1, {

                    drawSVG:"100%"

                })

                .to(line8, 1, {

                    width:"100%"

                })

                .to(lineSm9, 1, {

                    drawSVG:"100%"

                })

                .to(line10, 1, {

                    width:"100%"

                })

                .to(lineSm11, 1, {

                    drawSVG:"100%"

                })

                .to(lineSm12, 1, {

                    width:"100%"

                }) 

            }

        })







    }



    function funScreen5() {



        var line1 = $(".screen5_content .line-1 svg path");

        var line2 = $(".screen5_content .line-2 .main-line");

        var line2Next = $(".screen5_content .line-2-next .main-line");

        var line3 = $(".screen5_content .line-3 svg path");

        var centerImage = $(".screen5_content .center-image");





        var smLine1 = $(".screen5_content .line-sm-1 svg path");

        var smLine2 = $(".screen5_content .line-sm-2 .main-line");

        var smLine3 = $(".screen5_content .line-sm-3  svg path");

        var smLine4 = $(".screen5_content .line-sm-4 .main-line");



        gsap.set([line2,smLine4,line2Next], { 

            width:"0%"

        });

        gsap.set([smLine2], { 

            height:"0%"

        });



        gsap.set([line1,line3,smLine1,smLine3], { 

            drawSVG:"0%"

        }); 





        ScrollTrigger.matchMedia({ 

            "(min-width:992px)":function(){

                gsap.set(".screen5_content .center-image img", { 

                    y:400

                })

                gsap.timeline({

                    scrollTrigger:{ 

                        trigger:centerImage,

                        start:"top 100%", 

                        end:"bottom 100%", 

                        scrub:1.5, 

                        // markers:{ 

                        //     startColor:"#fff", 

                        //     endColor:"blue"

                        // } 

                    }

                }).to(".screen5_content .center-image img", {

                    y:"0"

                });



                gsap.timeline({

                    scrollTrigger:{

                        trigger:".screen5_content",

                        start:"top 70%",

                        end:"bottom 70%", 

                        scrub:true,

                        // markers:{ 

                        //     startColor:"#fff", 

                        //     endColor:"blue"

                        // }

                    }

                })

                .to(line1, 1, {

                    drawSVG:"-100%",

                }) 

                .to(line2, 0.2, {

                    width:"100%",

                }) 

                .to(line2Next, 0.5, { 

                    width:"100%",

                }) 

                .to(line3, 1, {

                    drawSVG:"100%"

                })

                

            },

            "(max-width:990px)":function(){

                gsap.set(".screen5_content .center-image img", {

                    y:400

                })

                gsap.timeline({

                    scrollTrigger:{

                        trigger:centerImage,

                        start:"top 100%", 

                        end:"bottom 100%",

                        scrub:1.5, 

                        // markers:{ 

                        //     startColor:"#fff", 

                        //     endColor:"blue"

                        // }

                    }

                }).to(".screen5_content .center-image img", { 

                    y:"0"

                });



                

                gsap.timeline({

                    scrollTrigger:{

                        trigger:".screen5_content",

                        start:"top 70%",

                        end:"bottom 100%", 

                        scrub:true,

                        // markers:{ 

                        //     startColor:"#fff", 

                        //     endColor:"blue"

                        // }

                    }

                })

                .to(smLine1, 1, {

                    drawSVG:"100%",

                })

                .to(smLine2, 1, {

                    height:"100%"

                })

                .to(smLine3, 1, {

                    drawSVG:"-100%"

                })

                .to(smLine4, 1, { 

                    width:"100%"

                })

                .to(line2Next, 0.5, { 

                    width:"100%",

                }) 

                .to(line2, 0.2, {

                    width:"100%",

                })  

            }

        })



    }



    function funScreen6(){ 



       // Left Value

       let overallBudget = $("#overall-budget"),
       
        

           seoVal = $("#seo-val"),

           googleVal = $("#google-val"),

           marketingVal = $("#marketing-val"),
           monthlyBudget =  $("#monthly-budget-val"),
           TCRVal =  $("#tcr-val"),
           AVOVal =  $("#avo-val"),
           LCRVal =  $("#lcr-val"),
           CPCVal =  $("#cpc-val");
        // right silde field

        let 
            // Reach = $("#Reach"),
            // engagement = $("#engagement"),
            // leads = $("#leads");
            // message = $("#message");
            // impression = $("#impression");
            ExpectedCPC = $("#cpc");
            TargetRate = $("#tcr");
            AverageOrderValue = $("#aov");
            LeadCustomerRate = $("#lcr");
            NumOfClicks = $("#no_of_clicks");
            NumOfLeads = $("#no_of_leads");
            CostPerLead = $("#cost_per_lead");
            valueOfLeads = $("#value_of_lead");
            ExpectedRevenues  = $("#revenues");
           
        let cal__input = $(".cal__input");



        // monthlyBudget.on('keyup', function() {


        //     console.log($(this).val())
        //     var ov = $(this).val();
            
            
        //     if(!isNaN(ov)){
        //         // var get5 = Math.round((5 / 20000) * ov)

        //         // var get3 = Math.round((3 / 20000) * ov)
        //         // var get1000 = Math.round((1000 / 20000) * ov)
        //         // var get30 = Math.round((30 / 20000) * ov)
        //         // CPCVal.val(get5);

        //         // TCRVal.val(get3)
        //         // AVOVal.val(get1000)
        //         // LCRVal.val(get30)
        //         // marketingVal.val(get40)
               
        //         singleBudget($(this).val());
        //     }



        // });





        cal__input.on('keyup', function() {

            var i = 0;

            cal__input.each(function(){

                i += $(this).val() != "" ? Number($(this).val()) : Number(0);

            });
            // monthlyBudget.val(i);
            singleBudget(i);
           

        });





        function singleBudget(input){

            var val = input;

            if(!isNaN(val)){

                var engagementVal = (2166 / 100) * val;
                var engagementVal1 = (80 / 100) * val;
                var totalvaleng=engagementVal + engagementVal1;
                var leadsVal = (36 / 100) * val;
                var messageVal = (15 / 100) * val;
                var impressionVal = (270 / 100) * val;
                var impressionVal1 = (2 / 100) * val;
                var totalvalimp = impressionVal+ impressionVal1;
                var googlevalue = $("#google-val").val();
                var marketingvalue = $("#marketing-val").val();
                var seovalue = $("#seo-val").val();
                 var monthlyBudgetValue = $("#monthly-budget-val").val();
               
                var TcrValue = $("#tcr-val").val();
                var AVOValue = $("#avo-val").val(); 
                var LCRValue = $("#lcr-val").val();
                var CPCValue = $("#cpc-val").val();
                
                var finalTCR =  TcrValue/100;
                var finalLCR = LCRValue/100;
                
                // var TCR = 0.00015;
                // var CPC = 0.00025;
                // var AVO = 0.05;
                // var LCR = 0.0015;
                var num_click = 0.2;
                var num_leads = 0.006;
                var cost_per_lead = 0.00835;
                var valueOfLead = 0.015;
                var expecteRevenues = 1.8;
                // var seoReach = 282;
                // var seoEnagegment = 21.66;
                // var seoLeads = 0.36;
                // var seoMessages = 0.15;
                // var GAImpressions = 27000;
                // var IMImpression = 20;
                // var IMEngagement = 0.8;
                 
                //  var finalImpressions = (googlevalue * GAImpressions) + (marketingvalue * IMImpression); 
                //  console.log("imPressions: " + finalImpressions)
                //  var finalReach = seovalue * seoReach;
                //  console.log("reach: " + finalReach);
                //  var finalLeadss = seovalue * seoLeads;
                //  console.log("leads: " + finalLeads);
                //  var finalMessages = seovalue * seoMessages;
                //  console.log("messages: " + finalMessages);
                //  var finalEngagement = (seovalue * seoEnagegment) + (marketingvalue * IMEngagement);
                //  console.log("engagement: " + finalEngagement);
                //  var finalCPC = (CPC * CPCValue);
                //  var finalTCR = (TCR * TcrValue);
                //  var finalAVO = (AVO * AVOValue);
                //  var finalLCR = (LCR * LCRValue);
                //  var finalExpectedRevenues = (monthlyBudgetValue * expecteRevenues);
                //  var finalClick = (monthlyBudgetValue * num_click);
                //  var finalLeads = (monthlyBudgetValue * num_leads);
                //  var finalCostLead = (monthlyBudgetValue * cost_per_lead);
                //  var finalValueOfLead = (monthlyBudgetValue * valueOfLead);
                
                
                 var finalClick = (monthlyBudgetValue / CPCValue);
                 var finalLeads = (finalClick * finalTCR);
                 var finalCostLead = (monthlyBudgetValue / finalLeads);
                 var finalValueOfLead = (monthlyBudgetValue / AVOValue)*1000;
                 var finalExpectedRevenues = (finalLeads * LCRValue)/100;
                
              
              if(!finalClick || finalClick=="Infinity"){
                  
                   NumOfClicks.text(0);
              }else{
                  
                  NumOfClicks.text( Math.round(finalClick) > 999 ? Math.sign(finalClick)*((Math.round(finalClick)/1000).toFixed(1)) + 'k' : Math.sign(finalClick)*Math.round(finalClick));
              }
              
              if(!finalLeads || finalLeads=="Infinity" ){
                   NumOfLeads.text(0);
              }else{
                 NumOfLeads.text( Math.round(finalLeads) > 999 ? Math.sign(finalLeads)*((Math.round(finalLeads)/1000).toFixed(1)) + 'k' : Math.sign(finalLeads)*Math.round(finalLeads));  
              }
              
              if(!finalCostLead || finalCostLead=="Infinity"){
                   CostPerLead.text(0);
              }else{
                 CostPerLead.text( Math.round(finalCostLead) > 999 ? Math.sign(finalCostLead)*((Math.round(finalCostLead)/1000).toFixed(1)) + 'k' : Math.sign(finalCostLead)*Math.round(finalCostLead)); 
              }
                if(!finalLeads){
                   ExpectedRevenues.text(0);
              }else{
                 ExpectedRevenues.text( Math.round(finalExpectedRevenues) > 999 ? Math.sign(finalExpectedRevenues)*((Math.round(finalExpectedRevenues)/1000).toFixed(1)) + 'k' : Math.sign(finalExpectedRevenues)*Math.round(finalExpectedRevenues));  
              }
              
              if(!finalValueOfLead || finalValueOfLead=="Infinity"){
                  
                    valueOfLeads.text(0);
              }else{
                 valueOfLeads.text( Math.round(finalValueOfLead) > 999 ? Math.sign(finalValueOfLead)*((Math.round(finalValueOfLead)/1000).toFixed(1)) + 'k' : Math.sign(finalValueOfLead)*Math.round(finalValueOfLead)); 
              }
              
              
             
             
              
             
            //   ExpectedRevenues.text((Math.round(finalExpectedRevenues)) + "%");
            
               Reach.text(Math.round(finalReach) > 999 ? Math.sign(finalReach)*((Math.round(finalReach)/1000).toFixed(1)) + 'k' : Math.sign(finalReach)*Math.round(finalReach));
            //   engagement.text( Math.round(finalEngagement) > 999 ? Math.sign(finalEngagement)*((Math.round(finalEngagement)/1000).toFixed(1)) + 'k' : Math.sign(finalEngagement)*Math.round(finalEngagement));
            //   impression.text( Math.round(finalImpressions) > 999 ? Math.sign(finalImpressions)*((Math.round(finalImpressions)/1000).toFixed(1)) + 'k' : Math.sign(finalImpressions)*Math.round(finalImpressions));
            //   message.text(  Math.round(finalMessages) > 999 ? Math.sign(finalMessages)*((Math.round(finalMessages)/1000).toFixed(1)) + 'k' : Math.sign(finalMessages)*Math.round(finalMessages));
            //   leads.text( Math.round(finalLeads) > 999 ? Math.sign(finalLeads)*((Math.round(finalLeads)/1000).toFixed(1)) + 'k' : Math.sign(finalLeads)*Math.round(finalLeads));
            //   ExpectedCPC.text( Math.round(finalCPC) > 999 ? Math.sign(finalCPC)*((Math.round(finalCPC)/1000).toFixed(1)) + 'k' : Math.sign(finalCPC)*Math.round(finalCPC));
            //   TargetRate.text( Math.round(finalTCR) > 999 ? Math.sign(finalTCR)*((Math.round(finalTCR)/1000).toFixed(1)) + 'k' : Math.sign(finalTCR)*Math.round(finalTCR));
            //   AverageOrderValue.text( Math.round(finalAVO) > 999 ? Math.sign(finalAVO)*((Math.round(finalAVO)/1000).toFixed(1)) + 'k' : Math.sign(finalAVO)*Math.round(finalAVO));
            //   LeadCustomerRate.text( Math.round(finalLCR) > 999 ? Math.sign(finalLCR)*((Math.round(finalLCR)/1000).toFixed(1)) + '%' : Math.sign(finalLCR)*Math.round(finalLCR));
             
            //   TargetRate.text((Math.round(finalTCR)) + "%");
             
            //   Reach.text((Math.round(finalReach)) + "k");
                // leads.text( Math.round(finalLeads));
                // message.text( Math.round(finalMessages));
                // engagement.text( Math.round(finalEngagement));
                // impression.text( Math.round(finalImpressions));  
                // leads.text( Math.round((seovalue *36 )/ 100));

            }

        }



        var line1 = $(".screen6_content .line-1");

        var line2 = $(".screen6_content .line-2");



        var line1Main = $(".screen6_content .line-1 .main-line");

        var line2Main = $(".screen6_content .line-2 .main-line");



        gsap.set([line1Main,line2Main], { 

            height:"0%"

        });



        ScrollTrigger.matchMedia({ 

            "(min-width:992px)":function(){

                gsap.timeline({

                    scrollTrigger:{

                        trigger:line1,  

                        start:"top 70%",  

                        end:"bottom 50%",  

                        scrub:true,

                        // markers:{ 

                        //     startColor:"blue", 

                        //     endColor:"blue"

                        // }

                    }

                }).to(line1Main, 0.5, { 

                    height:"100%"

                })

                gsap.timeline({

                    scrollTrigger:{ 

                        trigger:line2,  

                        start:"top 70%",  

                        end:"bottom 70%",  

                        scrub:true,

                        // markers:{ 

                        //     startColor:"blue", 

                        //     endColor:"blue"

                        // }

                    }

                }).to(line2Main, 0.5, {  

                    height:"100%"

                })

                

            }

        })

    }



    function funScreen7(){ 



        var line1 = $(".screen7_content .line-1 .main-line");

        var line2 = $(".screen7_content .line-2 .main-line");

        var line3 = $(".screen7_content .line-3 svg path");

        var line4 = $(".screen7_content .line-4 .main-line");

        var line5 = $(".screen7_content .line-5 svg path");

        var line6 = $(".screen7_content .line-6 .main-line");



        gsap.set([line1,line4], { 

            height:"0%"

        });

        gsap.set([line2,line6], { 

            width:"0%"

        });

        gsap.set([line3,line5], { 

            drawSVG:"0%"

        });



        ScrollTrigger.matchMedia({ 

            "(min-width:992px)":function(){

                gsap.timeline({

                    scrollTrigger:{ 

                        trigger:".screen7_content",  

                        start:"top 70%",  

                        end:"bottom 100%",

                        scrub:true,

                        // markers:{ 

                        //     startColor:"blue", 

                        //     endColor:"blue"

                        // }

                    }

                })

                .to(line1, 0.5, {  

                    height:"100%"

                })

                .to(line2, 0.5, {  

                    width:"100%"

                })

                .to(line3, 0.5, {  

                    drawSVG:"100%"

                })

                .to(line4, 0.5, {  

                    height:"100%"

                })

                .to(line5, 0.5, {   

                    drawSVG:"-100%"

                })

                .to(line6, 0.5, {  

                    width:"100%"

                })

            }

        })

    }

  // TESTIMONIAL SECTION

new Swiper(".testimonial-slide", {
    // effect: "cube",
    pagination: {
      el: ".testimonial-pagination",
      clickable:true,
    },
});

$(window).on('load', function() { 
    $('.testimonial-video').each(function() {
        var videoData = $(this).attr('data-video-id');
        var html = `<iframe src="https://www.youtube.com/embed/${videoData}" loading="lazy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        $(this).append(html); 
    });
});


function testimonial_scren(){
    var line1 = $('.testimonial-video-wrapper .top-line .main-line');
    var line2 = $('.testimonial-video-wrapper .right-line svg path');
    var line3 = $('.testimonial-video-wrapper .bottom-line .line1 svg path');
    var line4 = $('.testimonial-video-wrapper .bottom-line .line2 .main-line');
    var line5 = $('.testimonial-video-wrapper .bottom-line .line3 svg path');
    gsap.set(line1, {height:'0%'})
    gsap.set(line2, {drawSVG:"0%"})
    gsap.set(line3, {drawSVG:"0%"})
    gsap.set(line4, {width:"0%"})
    gsap.set(line5, {drawSVG:"0%"})

    ScrollTrigger.matchMedia({
        "(min-width:992px)":function(){ 
            gsap.timeline({
                scrollTrigger:{
                    trigger:".testimonial-section",
                    start:"top 70%",
                    end:"bottom 70%", 
                    scrub:true,
                    // markers:{ 
                    //     startColor:"#fff", 
                    //     endColor:"blue"
                    // }
                },
                ease:Power0.easeNone
            })
            .to(line1, 0.5, {
                height:"100%",
            }).to(line2, 0.5, {
                drawSVG:"-100%",
            }).to(line3, 0.5, {
                drawSVG:"-100%",
            }).to(line4, 0.5, {
                width:"100%",
            }).to(line5, 0.5, {
                drawSVG:"100%",
            }) 
        }
    })

}

  

})(jQuery); 