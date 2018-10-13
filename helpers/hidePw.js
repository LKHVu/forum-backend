import _ from 'lodash'

export default function hidePw(data){
    data = _.reduce(data || {}, (item, val, key ) => {
        if (typeof val !== 'function' && key !== 'password'){
            item[key] = val
        }
        return item
    }, {})

    return data
}