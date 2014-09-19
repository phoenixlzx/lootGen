'use strict';

angular.module('lootGen', [])
    .controller('lootController', ['$scope', function($scope) {

        $scope.loots = [
            {
                "item": 258,
                "amount": 1,
                "name": "&2Murder Axe",
                "powersMin": 1,
                "powersMax": 3,
                "lores": [
                    "&aFor felling the undead!"
                ],
                "durability": 8,
                "enchantments": [
                    {
                        "enchantment": "DAMAGE_UNDEAD",
                        "level": 6
                    }
                ]
            }
        ];

        $scope.newLoot = {
            "item": 0,
            "amount": 1,
            "name": "A Superheroic name!",
            "powersMin": 1,
            "powersMax": 3,
            "minEnchantments": 1,
            "maxEnchantments": 2,
            "lores": [
                "Some fantastic lores!"
            ],
            "durability": 10,
            "enchantments": [
                {
                    "enchantment": "DAMAGE_UNDEAD",
                    "level": 5
                }
            ]
        };

        var parseLoots = function(loots) {
            var result = {
                "loots": {}
            };
            var result_enchants = {};
            loots.forEach(function(loot, index) {
                result.loots[index + 1] = {};
                loot.enchantments.forEach(function(enchant, enchantIndex) {
                    result_enchants[enchantIndex + 1] = {};
                    result_enchants[enchantIndex + 1].enchantment = enchant.enchantment;
                    result_enchants[enchantIndex + 1].level = enchant.level;
                });
                for (var key in loot) {
                    if (loot[key]) {
                        result.loots[index + 1][key] = loot[key];
                    }
                }
                result.loots[index + 1].enchantments = result_enchants;
                loot.lores.forEach(function(lore, loreIndex) {
                    result.loots[index + 1]["lore" + (loreIndex + 1)] = lore;
                });
            });
            return result;
        };

        $scope.addLoot = function() {
            $scope.loots.push($scope.newLoot);
            $scope.refresh();
        };

        $scope.remove = function(arr, ele) {
            var index = arr.indexOf(ele);
            if (arr.length > 1 && index > -1) {
                arr.splice(index, 1);
            }
        };

        $scope.addLore = function(newLore) {
            $scope.newLoot.lores.push(newLore);
        };

        $scope.addEnchant = function() {
            $scope.newLoot.enchantments.push({
                "enchantment": "",
                "level": 1
            });
        };

        $scope.refresh = function() {
            $scope.yaml = json2yaml(parseLoots($scope.loots));
            console.log($scope.loots)
        };

    }]);