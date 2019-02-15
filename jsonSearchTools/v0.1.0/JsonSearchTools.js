/*!
 * jsonSearchTools v1.0.0 (https://github.com/kyu940/jsonSearchTools)
 * Copyright "Lee Kyu"
 * Licensed under the MIT license
 */

var JsonSearchTools = function(){};

JsonSearchTools.prototype = function() {
    var _originJsonArray = null;
    var _searchJsonArray = [];
    var _selectedItemLength = 0;


    var init = function(jsonArray){
        if(_originJsonArray == null){

            if( typeof(jsonArray) === 'string' ) {
                _originJsonArray = JSON.parse(jsonArray);
            }else if(Array.isArray(jsonArray)){
                _originJsonArray = jsonArray;
            }

            _selectedItemLength = _originJsonArray.length;
        }
    };


    var sortASC = function(list, key){
        list.sort(function(a,b){
            // descending order
            return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
        });

        return list;
    };


    var sortDESC = function(list, key){
        list.sort(function(a,b){
            // ascending order
            return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
        });

        return list;
    };


    var doSearch = function(searchKey, keyword, sortKey, sort, startIdx, endIdx, callback){
        _searchJsonArray = [];

        // search keyword
        if(keyword != null && keyword != ""){

            for(idx in _originJsonArray){
                item = _originJsonArray[idx];

                if(item[searchKey].toLowerCase().indexOf(keyword.toLowerCase()) != -1){
                    _searchJsonArray.push(item);
                }
            }
        }else{
            _searchJsonArray = JSON.parse(JSON.stringify(_originJsonArray));
        }

        // sort
        if(sort == null || sort == "" || sort == "asc"){
            _searchJsonArray = sortASC(_searchJsonArray, sortKey);
        }
        else if (sort == "desc"){
            _searchJsonArray = sortDESC(_searchJsonArray, sortKey);
        }
        else {
            _searchJsonArray = sortASC(_searchJsonArray, sortKey);
        }

        // slicing for page
        _selectedItemLength = Number(_searchJsonArray.length);

        if(startIdx != null && endIdx != null){
            _searchJsonArray = _searchJsonArray.slice(startIdx, endIdx);
        }

        if(callback != null){
            callback(_selectedItemLength, _searchJsonArray);
        }
    };


    return {
        "init": init,
        "doSearch" : doSearch
    }
}();
