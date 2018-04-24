import React from 'react';
import LocalizedStrings from './strings.json';

class CommonData extends React.Component {   

    static getLocalized(key, lang) {        
        lang = lang || "da-dk";

        for (const langName in LocalizedStrings) {
            if (langName.toLowerCase() === lang.toLowerCase()) {
                for (const keyName in LocalizedStrings[langName]) {
                    if (keyName.toLowerCase() === key.toLowerCase()) {
                        return LocalizedStrings[langName][keyName];
                    }
                }                
            }
        }
        
        return "{No such key}";
    }

    static getConditions(lang) {

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
                "file": "emoji_u1f600.svg",
                "color": "green"
            },
            {
                "name": "Optimistisk",
                "file": "emoji_u1f60f.svg",
                "color": "green"
            },
            {
                "name": "Forelsket",
                "file": "emoji_u1f60d.svg",
                "color": "green"
            },
            {
                "name": "Priviligeret",
                "file": "emoji_u1f60e.svg",
                "color": "green"
            },
            {
                "name": "Afslappet",
                "file": "emoji_u1f60c.svg",
                "color": "green"
            },

            {
                "name": "Træt",
                "file": "emoji_u1f634.svg",
                "color": "red"
            },
            {
                "name": "Frustreret",
                "file": "emoji_u1f635.svg",
                "color": "red"
            },
            {
                "name": "Skidt tilpas",
                "file": "emoji_u1f628.svg",
                "color": "red"
            },
            {
                "name": "Bekymret",
                "file": "emoji_u1f633.svg",
                "color": "red"
            },
            {
                "name": "Utålmodig",
                "file": "emoji_u1f644.svg",
                "color": "red"
            }
        ];
    }

    static getAnimalEmojis() {
        return {
            "path": "https://www.dr.dk/tjenester/nysgerrig/assets/NotoColorEmoji/",
            "collection": [
                {
                    "name": "emoji_u1f404",
                    "file": "emoji_u1f404.png"
                }, {
                    "name": "emoji_u1f40a",
                    "file": "emoji_u1f40a.png"
                }, {
                    "name": "emoji_u1f40c",
                    "file": "emoji_u1f40c.png"
                }, {
                    "name": "emoji_u1f40d",
                    "file": "emoji_u1f40d.png"
                }, {
                    "name": "emoji_u1f40e",
                    "file": "emoji_u1f40e.png"
                }, {
                    "name": "emoji_u1f411",
                    "file": "emoji_u1f411.png"
                }, {
                    "name": "emoji_u1f412",
                    "file": "emoji_u1f412.png"
                }, {
                    "name": "emoji_u1f414",
                    "file": "emoji_u1f414.png"
                }, {
                    "name": "emoji_u1f416",
                    "file": "emoji_u1f416.png"
                }, {
                    "name": "emoji_u1f418",
                    "file": "emoji_u1f418.png"
                }, {
                    "name": "emoji_u1f41c",
                    "file": "emoji_u1f41c.png"
                }, {
                    "name": "emoji_u1f41e",
                    "file": "emoji_u1f41e.png"
                }, {
                    "name": "emoji_u1f41f",
                    "file": "emoji_u1f41f.png"
                }, {
                    "name": "emoji_u1f422",
                    "file": "emoji_u1f422.png"
                }, {
                    "name": "emoji_u1f42b",
                    "file": "emoji_u1f42b.png"
                }, {
                    "name": "emoji_u1f43f",
                    "file": "emoji_u1f43f.png"
                }, {
                    "name": "emoji_u1f577",
                    "file": "emoji_u1f577.png"
                }, {
                    "name": "emoji_u1f980",
                    "file": "emoji_u1f980.png"
                }, {
                    "name": "emoji_u1f986",
                    "file": "emoji_u1f986.png"
                }, {
                    "name": "emoji_u1f987",
                    "file": "emoji_u1f987.png"
                }, {
                    "name": "emoji_u1f989",
                    "file": "emoji_u1f989.png"
                }
            ]
        }
    }

    static getVehicleEmojis() {
        return {
            "path": "https://www.dr.dk/tjenester/nysgerrig/assets/NotoColorEmoji/",
            "collection": [
            {
                "name": "emoji_u1f3cd",
                "file": "emoji_u1f3cd.png"
            }, {
                "name": "emoji_u1f3ce",
                "file": "emoji_u1f3ce.png"
            }, {
                "name": "emoji_u1f680",
                "file": "emoji_u1f680.png"
            }, {
                "name": "emoji_u1f681",
                "file": "emoji_u1f681.png"
            }, {
                "name": "emoji_u1f682",
                "file": "emoji_u1f682.png"
            }, {
                "name": "emoji_u1f68c",
                "file": "emoji_u1f68c.png"
            }, {
                "name": "emoji_u1f691",
                "file": "emoji_u1f691.png"
            }, {
                "name": "emoji_u1f692",
                "file": "emoji_u1f692.png"
            }, {
                "name": "emoji_u1f693",
                "file": "emoji_u1f693.png"
            }, {
                "name": "emoji_u1f695",
                "file": "emoji_u1f695.png"
            }, {
                "name": "emoji_u1f697",
                "file": "emoji_u1f697.png"
            }, {
                "name": "emoji_u1f699",
                "file": "emoji_u1f699.png"
            }, {
                "name": "emoji_u1f69a",
                "file": "emoji_u1f69a.png"
            }, {
                "name": "emoji_u1f69c",
                "file": "emoji_u1f69c.png"
            }, {
                "name": "emoji_u1f6a2",
                "file": "emoji_u1f6a2.png"
            }, {
                "name": "emoji_u1f6b2",
                "file": "emoji_u1f6b2.png"
            }, {
                "name": "emoji_u1f6e5",
                "file": "emoji_u1f6e5.png"
            }, {
                "name": "emoji_u1f6eb",
                "file": "emoji_u1f6eb.png"
            }, {
                "name": "emoji_u1f6f4",
                "file": "emoji_u1f6f4.png"
            }, {
                "name": "emoji_u1f6f5",
                "file": "emoji_u1f6f5.png"
            }, {
                "name": "emoji_u26f5",
                "file": "emoji_u26f5.png"
            }
            ]
        }
    }

    static getFruitEmojis() {
        return {
            "path": "https://www.dr.dk/tjenester/nysgerrig/assets/NotoColorEmoji/",
            "collection": [
                {
                    "name": "emoji_u1f33d",
                    "file": "emoji_u1f33d.png"
                }, {
                    "name": "emoji_u1f347",
                    "file": "emoji_u1f347.png"
                }, {
                    "name": "emoji_u1f349",
                    "file": "emoji_u1f349.png"
                }, {
                    "name": "emoji_u1f34a",
                    "file": "emoji_u1f34a.png"
                }, {
                    "name": "emoji_u1f34b",
                    "file": "emoji_u1f34b.png"
                }, {
                    "name": "emoji_u1f34c",
                    "file": "emoji_u1f34c.png"
                }, {
                    "name": "emoji_u1f34d",
                    "file": "emoji_u1f34d.png"
                }, {
                    "name": "emoji_u1f34f",
                    "file": "emoji_u1f34f.png"
                }, {
                    "name": "emoji_u1f350",
                    "file": "emoji_u1f350.png"
                }, {
                    "name": "emoji_u1f352",
                    "file": "emoji_u1f352.png"
                }, {
                    "name": "emoji_u1f353",
                    "file": "emoji_u1f353.png"
                }, {
                    "name": "emoji_u1f951",
                    "file": "emoji_u1f951.png"
                }, {
                    "name": "emoji_u1f954",
                    "file": "emoji_u1f954.png"
                }, {
                    "name": "emoji_u1f955",
                    "file": "emoji_u1f955.png"
                }, {
                    "name": "emoji_u1f95c",
                    "file": "emoji_u1f95c.png"
                }, {
                    "name": "emoji_u1f95d",
                    "file": "emoji_u1f95d.png"
                }, {
                    "name": "emoji_u1f965",
                    "file": "emoji_u1f965.png"
                }, {
                    "name": "emoji_u1f966",
                    "file": "emoji_u1f966.png"
                }
            ]
        }
    }
}

export default CommonData;
