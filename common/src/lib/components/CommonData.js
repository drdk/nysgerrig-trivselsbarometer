import React from 'react';  

class CommonData extends React.Component {

    static getConditions() {
        return [
            {
                "name": "Afslappet",
                "color": "green"
            }, {
                "name": "OK",
                "color": "yellow"
            }, {
                "name": "Belastet",
                "color": "red"
            }
        ];
    }

    static getFeelings() {
        return [        
            {
                "name": "Glad",
                "file": "emoji_u1f600.svg"
            },
            {
                "name": "Optimistisk",
                "file": "emoji_u1f60f.svg"
            },
            {
                "name": "Forelsket",
                "file": "emoji_u1f60d.svg"
            },
            {
                "name": "Priviligeret",
                "file": "emoji_u1f60e.svg"
            },
            {
                "name": "Afslappet",
                "file": "emoji_u1f60c.svg"
            },

            {
                "name": "Træt",
                "file": "emoji_u1f634.svg"
            },
            {
                "name": "Frustreret",
                "file": "emoji_u1f635.svg"
            },
            {
                "name": "Skidt tilpas",
                "file": "emoji_u1f628.svg"
            },
            {
                "name": "Bekymret",
                "file": "emoji_u1f633.svg"
            },
            {
                "name": "Utålmodig",
                "file": "emoji_u1f644.svg"
            }
        ];
    }
}

export default CommonData;
