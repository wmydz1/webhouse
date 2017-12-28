
export default {
    strLength (str) {
        if (str == null) return 0;
        if (!_.isString(str)){
            str += ""
        }
        return str.replace(/[^\x00-\xff]/g,"01").length;
    },
    subStr(str, length) {
        var regex=/[^\x00-\xff]/g;
        if(str.replace(regex, '  ').length <= length){
            return str
        }
        var mIndex = Math.floor(length / 2)
        for(var i = mIndex; i < str.length; i++) {
            if(str.substr(0, i).replace(regex, '  ').length >= length){
                return str.substr(0,i)
            }
        }
        return str;
    },
    buildQuery(params) {
        let extras = new Array()
        _.forIn(params, (value, key) => {
            if(!_.isUndefined(value)) {
                extras.push(key + '=' + value)
            }
        })
        extras = extras.join('&');
        return extras ? '&' + extras : ''
    },

    parseUrl (url) {
        var a = document.createElement('a')
        a.href = url
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function() {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue
                    }
                    s = seg[i].split('=')
                    ret[s[0]] = s[1]
                }
                return ret
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        }
    }
}
