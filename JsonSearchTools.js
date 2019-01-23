var JsonSearchTools = function(){};

JsonSearchTools.prototype = function() {
    var _originJsonArray = null;
    var _searchJsonArray = [];
    var _selectedItemLength = 0;


    var init = function(jsonArray){
        if(_originJsonArray == null){
            //TODO: Add parsing code if json Strings.

            _originJsonArray = jsonArray;
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


    var doSearch = function(keyword, sort, startIdx, endIdx, callback){
        _searchJsonArray = [];

        // search keyword
        if(keyword != null && keyword != ""){

            for(idx in _originJsonArray){
                item = _originJsonArray[idx];

                if(item["title"].toLowerCase().indexOf(keyword.toLowerCase()) != -1){
                    _searchJsonArray.push(item);
                }
            }
        }else{
            _searchJsonArray = JSON.parse(JSON.stringify(_originJsonArray));
        }

        // sort
        if(sort == null || sort == "" || sort == "newest"){
            _searchJsonArray = sortASC(_searchJsonArray, "create_date");
        }
        else if (sort == "asc"){
            _searchJsonArray = sortASC(_searchJsonArray, "title");
        }
        else if (sort == "desc"){
            _searchJsonArray = sortDESC(_searchJsonArray, "title");
        }
        else if (sort == "oldest"){
            _searchJsonArray = sortDESC(_searchJsonArray, "create_date");
        }
        else {
            _searchJsonArray = sortASC(_searchJsonArray, "create_date");
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
