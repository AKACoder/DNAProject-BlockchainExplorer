//todo: make a key code map

const BETools = {
    keyCode: {
        isInvalidNumberInputKey(keyCode) {
            const validCodeMap = [
                //numbers
                [48, 57],
                [96, 105],

                //number lock
                [144, 144],

                //enter
                [13, 13],
                [108, 108],

                //backspace
                [8, 8],

                //esc
                [27, 27],

                //other control keys, such as pageDown pageUp and so on
                [33, 46],
            ]

            let keyCodeOutOfRange = function(range) {
                return !(keyCode >= range[0] && keyCode <= range[1])
            }

            return validCodeMap.every(keyCodeOutOfRange)
        },

        isEnterCode(keyCode) {
            return 13 === keyCode || 108 === keyCode
        },

        isEscCode(keyCode) {
            return 27 === keyCode
        }
    }
}

export {
    BETools
}