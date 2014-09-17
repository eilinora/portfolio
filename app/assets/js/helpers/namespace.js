/**
 * Helpful namespace automation provided by 
 * http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/
 * @param  {String} namespaceString namesspace string we want to declare
 * @return {}                 object namespace will generate
 */
function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    
        
    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    
    return parent;
}