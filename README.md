# jsonSearchTools
can do search, sort, and slice of jsonArray.

```javascript
var jsonSearchTools = null;
$(document).ready(function(){
    jsonSearchTools = new JsonSearchTools();
    jsonSearchTools.init([{"title":"1", "create_date":"2019-01-23"},{"title":"2", "create_date":"2019-01-23"},.......]);

    jsonSearchTools.doSearch(null, null, null, null, function(selectedItemLength, searchItemList){
        fn<portlet:namespace/>.init(selectedItemLength, searchItemList);
    });
});
```
