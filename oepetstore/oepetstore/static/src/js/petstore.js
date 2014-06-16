openerp.oepetstore = function(instance) {
    var _t = instance.web._t,
        _lt = instance.web._lt;
    var QWeb = instance.web.qweb;

    instance.oepetstore = {};

    instance.web.client_actions.add('petstore.homepage', 'instance.oepetstore.HomePage'); // add before create new instance

    instance.oepetstore.HomePage = instance.web.Widget.extend({

        init : function () {

        },



        find_element: function(ele_string) {

            return this.$el.find(ele_string);
        },

        find_manager: function(magaer_id) {

        },

        add_element_child: function (result) {
            if (result.length > 1) {
                element_all = "<ul>"
                element_parent = ''
                _.each(result, function (data) {
                    element_all += "<li class=" +data.id+ "><a href='#' class=" +data.id+ ">" +data.name + "</a></li>"
                    element_parent = self.find_element("a[class='" + data.parent_id[0] + "']");

                })
                element_all += "</ul>"
                if (element_all && element_parent) {
                    element_parent.after(element_all);
                }
            }
            else {
                _.each(result, function(data) {
                    element = self.find_element("a[class='" + data.parent_id[0] + "']");
                    element.after("<ul id='" +result[0].id+ "'><a id=' class=" +data.id+ ">" +result[0].id+ "' href='#'>" +result[0].name+ "</a></ul>");


                })
            }

        },





        start: function () {

            var self = this;
            var depart = [];

            model = new instance.web.Model("hr.department")
            this.$el.append("<div class='tree' name='tree'</div>");
            div = self.find_element("div[name=tree]")
            model.query(['name', 'child_ids']).filter([
                ['parent_id', '=', false]
            ]).limit().all().then(function (result) {
                _.each(result, function (object) {

                    //auto looping object
                    div.append("<ul><li id='" + object.id + "'" + "><a id='" + object.id + "' href='#' >" + object.name + "</a><ul class='" + object.id + "'></ul></ul></li></ul>");
                    if (object.child_ids && object.child_ids[0]) {
                        _.each(object.child_ids, function(v, k) {
                            element = self.find_element("ul[class=" + object.id + "]"); //error replace end element
                            model.query(['id', 'name', 'child_ids']).filter([['id', '=', v]]).limit().all().then(function (result) { //will be return list object
                                result = result[0];
                                element.append("<li id='" + result.id + "'" + "><a class='" + result.id + "' href='#' >" + result.name + "</a></li>");
                                model.query(['id', 'name', 'child_ids', 'parent_id']).filter([['parent_id', '=', result.id]]).limit().all().then(function (result) {
                                    if (result.length > 1) {
                                        element_all = "<ul>"
                                        element_parent = ''
                                        _.each(result, function (data) {
                                            element_all += "<li class=" +data.id+ "><a href='#' class=" +data.id+ ">" +data.name + "</a></li>"
                                            element_parent = self.find_element("a[class='" + data.parent_id[0] + "']");

                                        })
                                        element_all += "</ul>"
                                        if (element_all && element_parent) {
                                            element_parent.after(element_all);
                                        }
                                    }
                                    else {
                                        _.each(result, function(data) {
                                            element = self.find_element("a[class='" + data.parent_id[0] + "']");
                                            element.after("<ul id='" +result[0].id+ "'><a id=' class=" +data.id+ ">" +result[0].id+ "' href='#'>" +result[0].name+ "</a></ul>");


                                        })
                                    }

                                })




                            });
                        });
                    }
                })
            });
        }
    });
}