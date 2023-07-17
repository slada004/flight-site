(function ($) {
    // USE STRICT
    "use strict";
    var JDV = JDV || {};

    // Sidebar Toggle
    $(function () {
        document.querySelectorAll('.sidelinks .has-sub').forEach(function(element){
            element.addEventListener('click', function (e) {
                let nextEl = element.nextElementSibling;
                let parentEl  = element.parentElement;  
            
                if(nextEl) {
                    e.preventDefault(); 
                    let mycollapse = new bootstrap.Collapse(nextEl);
    
                    if(nextEl.classList.contains('show')){
                        mycollapse.hide();
                    } else {
                        mycollapse.show();
                        // find other submenus with class=show
                        var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                        // if it exists, then close all of them
                        if(opened_submenu){
                            new bootstrap.Collapse(opened_submenu);
                        }
                    }
                }
                
            });
        });
        
    });

    // Sidenav navigation
    $(function () {
        if(window.matchMedia('(min-width: 1200px)').matches){
            $('body').addClass('sidebar-open ')
        }
        $('[data-toggle="side-nav"]').on("click", function () {
            if($("body").hasClass("sidebar-closed")) {
                $("body").removeClass("sidebar-closed").addClass("sidebar-open");
            }else if ($("body").hasClass("sidebar-open")) {
                $("body").addClass("sidebar-closed").removeClass("sidebar-open");
            }else{
                $("body").removeClass("sidebar-closed").addClass("sidebar-open");
            }
        });
        $('[data-toggle="mobile-nav"]').on("click", function () {
            if($("body").hasClass("sidebar-closed")) {
                $("body").removeClass("sidebar-closed").addClass("sidebar-open");
                $(".sidebar-wrap").addClass("sidebar-wrap-open");
            }else if ($("body").hasClass("sidebar-open")) {
                $("body").addClass("sidebar-closed").removeClass("sidebar-open");
                $(".sidebar-wrap").removeClass("sidebar-wrap-open");
            }else{
                $("body").removeClass("sidebar-closed").addClass("sidebar-open");
                $(".sidebar-wrap").addClass("sidebar-wrap-open");
            }
        });
        
        $(".sidebar-overlay").on("click", function () {
            $("body").addClass("sidebar-closed").removeClass("sidebar-open");
            $(".sidebar-wrap").removeClass("sidebar-wrap-open");
        });
        
    });

    // frontend scripts
    // activate menu item based on url
    $(function() {
        var url = window.location.href;
        $('.sidebar-link a').each(function() {
            if (this.href === url) {
                $(this).addClass('active');
            }
        });
        $('.hl').each(function() {
            if (this.href === url) {
                $(this).addClass('active');
                // $(this).parent().addClass("show"); // add show to collpse of the current link
            }
        });
    });

    JDV.plugins = {
        datetimepicker: function () {
            $('#dtpicker1').datetimepicker({  
                format: "YYYY-MM-DD hh:mm A",
                allowInputToggle: true,
                showClose: true,
                showClear: true,
                showTodayButton: true,
            });
            $('#dtpicker2').datetimepicker({  
                format: "YYYY-MM-DD hh:mm A",
                allowInputToggle: true,
                showClose: true,
                showClear: true,
                showTodayButton: true,
            });
            $('#dtpicker3').datetimepicker({  
                format: "YYYY-MM-DD hh:mm A",
                allowInputToggle: true,
                showClose: true,
                showClear: true,
                showTodayButton: true,
            });
            $('#datepicker1').datetimepicker({  
                format: "YYYY-MM-DD",
                allowInputToggle: true,
                showClear: true,
            });
            $('#datepicker2').datetimepicker({  
                format: "YYYY-MM-DD",
                allowInputToggle: true,
            });
            $('#datepicker3').datetimepicker({  
                format: "YYYY-MM-DD",
                allowInputToggle: true,
            });
            $('#timepicker1').datetimepicker({  
                format: "hh:mm A",
            });
            $('#timepicker2').datetimepicker({  
                format: "hh:mm A",
            });
            $('#timepicker3').datetimepicker({  
                format: "hh:mm A",
            });            
        },
        
        textEditor: function () {
           
        },

        select2: function () {
            $(".select2").select2({
                theme: "bootstrap-5",
            });
            $("#form-select-sm").select2({
                theme: "bootstrap-5",
                containerCssClass: "select2--small", // For Select2 v4.0
                selectionCssClass: "select2--small", // For Select2 v4.1
                dropdownCssClass: "select2--small",
            });
        },

        datatable: function () {
            $('#datatable').DataTable({
                // "scrollX": true 
            });
            $('#datatable1').DataTable({
                "scrollX": true 
            });
            $('#datatablex').DataTable({
                "ordering": false 
            });
        }

    };

    JDV.extra = {
        initActiveMenu: function () {
            var url = window.location.href.split(/[?#]/)[0];
            $('.sidelinks a').each(function() {
                if (this.href === url) {
                    $(this).addClass('active');
                    $(this).parent().addClass("show"); // add show to collpse of the current link
                    $(this).parent().prev().addClass("active"); // add active class to an anchor
                    //     .addClass("show");
                }
            });
        },
    };

    // Init JDV plugins
    JDV.plugins.datetimepicker();
    JDV.plugins.textEditor();
    JDV.plugins.datatable();
    JDV.plugins.select2();
    // JDV.plugins.multiSelect();

    // Init JDV extras
    JDV.extra.initActiveMenu();

})(jQuery);

function sideMenuClose() {
    $(".side-menu-wrap,.side-menu-overlay")
        .removeClass("opacity-1")
        .addClass("opacity-0");
}

function sideMenuOpen() {
    $(".side-menu-wrap,.side-menu-overlay")
        .removeClass("opacity-0")
        .addClass("opacity-1");
}

