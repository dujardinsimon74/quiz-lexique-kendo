export interface Term {
  jp: string;
  ans: string;
  cat: string;
}

export const LEXIQUE: Term[] = [
  // Fondamentaux
  { jp: "Kendô", ans: "Voie du sabre", cat: "Fondamentaux" },
  { jp: "Budô", ans: "Voie de l'art militaire", cat: "Fondamentaux" },
  {
    jp: "Bushi",
    ans: "Guerrier, personne de la classe des guerriers",
    cat: "Fondamentaux",
  },
  { jp: "Bushidô", ans: "Voie du guerrier", cat: "Fondamentaux" },
  { jp: "Dôjô", ans: "Lieu de pratique de la voie", cat: "Fondamentaux" },
  { jp: "Keiko", ans: "Entraînement, exercice, leçon", cat: "Fondamentaux" },
  { jp: "Reigi", ans: "Politesse, convenances", cat: "Fondamentaux" },
  { jp: "Rei", ans: "Salut", cat: "Fondamentaux" },
  { jp: "Zarei", ans: "Salut en position Seiza", cat: "Fondamentaux" },
  { jp: "Ki", ans: "Esprit, énergie intérieure", cat: "Fondamentaux" },
  { jp: "Kiai", ans: "Cri concentrant l'énergie", cat: "Fondamentaux" },
  {
    jp: "Zanshin",
    ans: "Vigilance maintenue après la frappe",
    cat: "Fondamentaux",
  },
  {
    jp: "Shûgyô",
    ans: "Pratique sérieuse et continue de l'entraînement",
    cat: "Fondamentaux",
  },
  {
    jp: "Zen",
    ans: "Méditation, branche du bouddhisme japonais",
    cat: "Fondamentaux",
  },
  { jp: "Ken", ans: "Nom générique du sabre", cat: "Fondamentaux" },
  {
    jp: "Kenjutsu",
    ans: "Techniques utilitaires du sabre ; entraînement au maniement du sabre",
    cat: "Fondamentaux",
  },
  {
    jp: "Kendôgu",
    ans: "Équipement de protection complet pour la pratique du kendô",
    cat: "Fondamentaux",
  },
  {
    jp: "Kendôka",
    ans: "Personne experte en kendô, pratiquant de kendô",
    cat: "Fondamentaux",
  },
  {
    jp: "Kengô",
    ans: "Appellation historique d'un maître de sabre de réputation établie sur le terrain",
    cat: "Fondamentaux",
  },
  { jp: "Kenkaku", ans: "Escrimeur, bretteur", cat: "Fondamentaux" },
  {
    jp: "Kenshi",
    ans: "Escrimeur, bretteur (terme exact pour pratiquant de kendô)",
    cat: "Fondamentaux",
  },
  {
    jp: "Reihô",
    ans: "Les règles qui régissent la politesse",
    cat: "Fondamentaux",
  },
  { jp: "Kisoku", ans: "Règlement, règles", cat: "Fondamentaux" },
  { jp: "Kyôtei", ans: "Méthode d'enseignement", cat: "Fondamentaux" },
  { jp: "Waza", ans: "Technique", cat: "Fondamentaux" },
  { jp: "Gijutsu", ans: "Technique, habileté technique", cat: "Fondamentaux" },
  {
    jp: "Arigatô gozaimashita",
    ans: "Je vous remercie beaucoup (formule après l'entraînement)",
    cat: "Fondamentaux",
  },
  {
    jp: "Byôki",
    ans: "Maladie, maux (voir Yotsu no byôki)",
    cat: "Fondamentaux",
  },

  // Équipement
  { jp: "Bôgu", ans: "Ensemble des protections (armure)", cat: "Équipement" },
  {
    jp: "Men",
    ans: "Casque de protection / frappe à la tête",
    cat: "Équipement",
  },
  { jp: "Kote", ans: "Gant de protection", cat: "Équipement" },
  {
    jp: "Dô",
    ans: "Cuirasse de protection / frappe au tronc",
    cat: "Équipement",
  },
  { jp: "Tare", ans: "Tablier de protection des hanches", cat: "Équipement" },
  {
    jp: "Shinai",
    ans: "Arme de kendo en quatre lattes de bambou",
    cat: "Équipement",
  },
  { jp: "Bokken / Bokutô", ans: "Sabre de bois plein", cat: "Équipement" },
  {
    jp: "Katana",
    ans: "Sabre japonais (tranchant vers le haut)",
    cat: "Équipement",
  },
  { jp: "Tsuba", ans: "Garde de l'arme", cat: "Équipement" },
  { jp: "Tsuka", ans: "Poignée de l'arme", cat: "Équipement" },
  { jp: "Kensen", ans: "Pointe du sabre", cat: "Équipement" },
  {
    jp: "Tenugui",
    ans: "Bandeau de coton fin porté sous le casque",
    cat: "Équipement",
  },
  {
    jp: "Hakama",
    ans: "Large pantalon japonais traditionnel",
    cat: "Équipement",
  },
  { jp: "Keikogi", ans: "Veste d'entraînement", cat: "Équipement" },
  {
    jp: "Zekken",
    ans: "Étui de tissu sur le Tare avec le nom du pratiquant",
    cat: "Équipement",
  },
  {
    jp: "Iaitô",
    ans: "Sabre de métal non coupant (pour l'Iaidô et les kata)",
    cat: "Équipement",
  },

  // Anatomie du shinai
  { jp: "Ha", ans: "Tranchant d'une lame", cat: "Anatomie du shinai" },
  { jp: "Mine", ans: "Dos de la lame", cat: "Anatomie du shinai" },
  {
    jp: "Nakayui",
    ans: "Lacet plat de cuir du shinai, à 25 cm de la Saki gawa",
    cat: "Anatomie du shinai",
  },
  { jp: "Saki", ans: "Pointe de l'arme", cat: "Anatomie du shinai" },
  {
    jp: "Saki gawa",
    ans: "Partie en cuir qui recouvre l'extrémité du shinai",
    cat: "Anatomie du shinai",
  },
  {
    jp: "Saki gomu",
    ans: "Pièce en caoutchouc maintenant l'écartement des lames de bambou",
    cat: "Anatomie du shinai",
  },
  {
    jp: "Shinogi",
    ans: "Flanc de la lame, arête du flanc",
    cat: "Anatomie du shinai",
  },
  {
    jp: "Tsuba dome",
    ans: "Rondelle de caoutchouc destinée à maintenir la Tsuba en place",
    cat: "Anatomie du shinai",
  },
  {
    jp: "Tsuka gawa",
    ans: "Partie en cuir recouvrant la Tsuka",
    cat: "Anatomie du shinai",
  },
  {
    jp: "Tsuru",
    ans: "Fil robuste reliant la Saki gawa à la Tsuka du shinai",
    cat: "Anatomie du shinai",
  },

  // Types de sabres
  {
    jp: "Daitô",
    ans: "Sabre long, généralement de la forme du katana",
    cat: "Types de sabres",
  },
  { jp: "Ittô", ans: "Un sabre", cat: "Types de sabres" },
  { jp: "Nitô", ans: "Deux sabres", cat: "Types de sabres" },
  { jp: "Saya", ans: "Fourreau du sabre", cat: "Types de sabres" },
  {
    jp: "Shôtô",
    ans: "Sabre court (généralement appelé Wakizashi)",
    cat: "Types de sabres",
  },
  {
    jp: "Tachi",
    ans: "Long sabre suspendu, tranchant tourné vers le bas",
    cat: "Types de sabres",
  },

  // Tenue
  {
    jp: "Hachimaki",
    ans: "Pièce de coton (Tenugui) portée en bandeau autour de la tête",
    cat: "Tenue",
  },
  { jp: "Himo", ans: "Cordons, attaches du Men et du Dô", cat: "Tenue" },
  { jp: "Obi", ans: "Ceinture", cat: "Tenue" },
  {
    jp: "Tasuki",
    ans: "Ruban rouge ou blanc porté par le compétiteur",
    cat: "Tenue",
  },

  // Dôjô
  {
    jp: "Kamiza",
    ans: "Côté du dôjô réservé aux enseignants et aux invités",
    cat: "Dôjô",
  },
  { jp: "Shimoza", ans: "Partie du dôjô réservée aux élèves", cat: "Dôjô" },

  // Corps
  { jp: "Ashi", ans: "Jambe, pied", cat: "Corps" },
  { jp: "Atama", ans: "La tête", cat: "Corps" },
  { jp: "Hiji", ans: "Le coude", cat: "Corps" },
  { jp: "Kobushi", ans: "Le poing, les poings", cat: "Corps" },
  { jp: "Koshi", ans: "Les hanches", cat: "Corps" },
  { jp: "Me", ans: "Un œil, les yeux", cat: "Corps" },
  { jp: "Mune", ans: "La poitrine", cat: "Corps" },
  { jp: "Nodo", ans: "La gorge", cat: "Corps" },
  { jp: "Te", ans: "Main, mains", cat: "Corps" },
  { jp: "Ude", ans: "Le bras", cat: "Corps" },

  // Gardes & Positions
  { jp: "Kamae", ans: "Garde, position de combat", cat: "Gardes" },
  {
    jp: "Chûdan no kamae",
    ans: "Garde de milieu — la plus courante",
    cat: "Gardes",
  },
  { jp: "Jôdan no kamae", ans: "Garde haute", cat: "Gardes" },
  { jp: "Gedan no kamae", ans: "Garde basse", cat: "Gardes" },
  {
    jp: "Hassô no kamae",
    ans: "Garde à mi-hauteur côté droit, pointe vers le haut",
    cat: "Gardes",
  },
  {
    jp: "Waki gamae",
    ans: "Garde latérale basse, pointe dirigée vers l'arrière",
    cat: "Gardes",
  },
  {
    jp: "Hanmi no kamae",
    ans: "Garde de biais par rapport à l'adversaire",
    cat: "Gardes",
  },
  { jp: "Mu gamae", ans: "Sans garde, hors garde", cat: "Gardes" },
  {
    jp: "Tsuba zeri ai",
    ans: "Corps à corps, Tsuba en contact",
    cat: "Gardes",
  },
  { jp: "Shisei", ans: "Posture, attitude corporelle", cat: "Gardes" },
  { jp: "Shizentai", ans: "Position debout naturelle", cat: "Gardes" },
  { jp: "Anza", ans: "Position assise en tailleur", cat: "Gardes" },
  { jp: "Seiza", ans: "Position à genoux assis sur les talons", cat: "Gardes" },
  {
    jp: "Sonkyô",
    ans: "Position accroupie en début et fin de combat",
    cat: "Gardes",
  },
  {
    jp: "Taitô",
    ans: "Sabre à la ceinture, tenu de la main gauche au niveau de la ceinture",
    cat: "Gardes",
  },
  {
    jp: "Teitô",
    ans: "Arme tenue de la main gauche, bras allongé naturellement contre le corps",
    cat: "Gardes",
  },

  // Distances
  {
    jp: "Ma-aï",
    ans: "Intervalle espace-temps entre les deux adversaires",
    cat: "Distances",
  },
  {
    jp: "Chika ma",
    ans: "Garde rapprochée : les shinai sont nettement croisés",
    cat: "Distances",
  },
  {
    jp: "Issoku ittô no maai",
    ans: "Distance permettant de porter un Datotsu valable en un seul pas",
    cat: "Distances",
  },
  { jp: "Kyori", ans: "Distance, éloignement, intervalle", cat: "Distances" },
  {
    jp: "Nisoku ittô no maai",
    ans: "Distance nécessitant deux pas pour porter une attaque",
    cat: "Distances",
  },
  {
    jp: "Tô ma",
    ans: "Garde éloignée : les pointes des shinai ne se touchent pas",
    cat: "Distances",
  },

  // Déplacements
  {
    jp: "Ashi sabaki",
    ans: "Travail des pieds, déplacements",
    cat: "Déplacements",
  },
  {
    jp: "Okuri ashi",
    ans: "Déplacement fondamental en kendo",
    cat: "Déplacements",
  },
  {
    jp: "Ayumi ashi",
    ans: "Déplacement comme la marche normale",
    cat: "Déplacements",
  },
  {
    jp: "Hiraki ashi",
    ans: "Déplacement en sortant de l'axe face à l'adversaire",
    cat: "Déplacements",
  },
  {
    jp: "Tsugi ashi",
    ans: "Déplacement avec pied arrière en appui d'abord",
    cat: "Déplacements",
  },
  { jp: "Zenshin", ans: "Progression vers l'avant", cat: "Déplacements" },
  {
    jp: "Zenshin kôtai",
    ans: "Progression alternée avant et arrière",
    cat: "Déplacements",
  },
  { jp: "Tai sabaki", ans: "Fait de mouvoir son corps", cat: "Déplacements" },

  // Techniques
  {
    jp: "Datotsu",
    ans: "Ensemble des frappes et des piques",
    cat: "Techniques",
  },
  {
    jp: "Datotsu Bui",
    ans: "Zones valables des protections pour frapper",
    cat: "Techniques",
  },
  { jp: "Ha-suji", ans: "Sens du tranchant de l'arme", cat: "Techniques" },
  {
    jp: "Te no uchi",
    ans: "Contact des mains avec la poignée, frappe nette",
    cat: "Techniques",
  },
  {
    jp: "Ki Ken Taï no Ichi",
    ans: "Harmonisation esprit–sabre–corps",
    cat: "Techniques",
  },
  {
    jp: "Kime",
    ans: "Détermination sans faille dans la frappe",
    cat: "Techniques",
  },
  { jp: "Seme", ans: "Pression offensive sur l'adversaire", cat: "Techniques" },
  { jp: "Suki", ans: "Faille, inattention dans la garde", cat: "Techniques" },
  { jp: "Suburi", ans: "Frappes à vide en répétition", cat: "Techniques" },
  {
    jp: "Haya suburi",
    ans: "Suburi avec déplacements rapides",
    cat: "Techniques",
  },
  {
    jp: "Shômen",
    ans: "Frappe au milieu du sommet de la tête",
    cat: "Techniques",
  },
  { jp: "Yoko men", ans: "Frappe sur le côté de la tête", cat: "Techniques" },
  {
    jp: "Tsuki",
    ans: "Coup de pointe à la poitrine ou à la gorge",
    cat: "Techniques",
  },
  {
    jp: "Tai atari",
    ans: "Choc des corps après une attaque",
    cat: "Techniques",
  },
  { jp: "Hyôshi", ans: "Rythme, cadence", cat: "Techniques" },
  {
    jp: "Butsukaru",
    ans: "Heurter fortement, entrer en collision, bousculer",
    cat: "Techniques",
  },
  {
    jp: "Ikkyodô",
    ans: "En un seul temps (exécution d'un mouvement)",
    cat: "Techniques",
  },
  {
    jp: "Irimi",
    ans: "Introduire le corps à l'intérieur de la garde de l'adversaire",
    cat: "Techniques",
  },
  {
    jp: "Kigurai",
    ans: "Belle allure, prestance ; attitude physique et mentale du pratiquant",
    cat: "Techniques",
  },
  {
    jp: "Kirite",
    ans: "La main qui coupe ; action des mains",
    cat: "Techniques",
  },
  {
    jp: "Korosu",
    ans: "Détruire la stabilité adverse : Ken o korosu, Ki o korosu ou Waza o korosu",
    cat: "Techniques",
  },
  { jp: "Nigiri", ans: "Prise des mains sur la Tsuka", cat: "Techniques" },
  {
    jp: "San kyodô",
    ans: "En trois temps (exécution d'un mouvement)",
    cat: "Techniques",
  },
  {
    jp: "Shibori",
    ans: "Action des mains sur la Tsuka, similaire à tordre",
    cat: "Techniques",
  },
  {
    jp: "Shimeru",
    ans: "Serrer ; action complexe des mains sur la Tsuka du shinai",
    cat: "Techniques",
  },
  {
    jp: "Sutemi",
    ans: "Action faite en sacrifice, sans retenue, en engageant toute l'énergie",
    cat: "Techniques",
  },
  {
    jp: "Tame",
    ans: "Accumulation d'énergie avant la frappe",
    cat: "Techniques",
  },
  {
    jp: "Tobi komi",
    ans: "Plongeon, irruption ; action portée en Sutemi",
    cat: "Techniques",
  },
  {
    jp: "Tsumeru",
    ans: "Raccourcir la distance sans rien laisser faire à l'adversaire",
    cat: "Techniques",
  },

  // Waza
  {
    jp: "Shikake waza",
    ans: "Techniques d'attaque en prenant l'initiative",
    cat: "Waza",
  },
  {
    jp: "Oji waza",
    ans: "Techniques de réponse aux attaques adverses",
    cat: "Waza",
  },
  {
    jp: "Hiki waza",
    ans: "Techniques avec déplacement vers l'arrière",
    cat: "Waza",
  },
  {
    jp: "Harai waza",
    ans: "Chasser l'arme adverse de bas en haut",
    cat: "Waza",
  },
  {
    jp: "Hari waza",
    ans: "Écarter l'arme adverse par un mouvement latéral court et sec",
    cat: "Waza",
  },
  {
    jp: "Nuki waza",
    ans: "Esquive + riposte dans le même mouvement",
    cat: "Waza",
  },
  {
    jp: "Kaeshi waza",
    ans: "Défense par renversement puis riposte",
    cat: "Waza",
  },
  {
    jp: "Suriage waza",
    ans: "Défense en frottant vers le haut puis riposte",
    cat: "Waza",
  },
  {
    jp: "Debana waza",
    ans: "Attaque sur l'intention ou le début de l'attaque adverse",
    cat: "Waza",
  },
  { jp: "Renzoku waza", ans: "Techniques portées successivement", cat: "Waza" },
  {
    jp: "Ni dan waza",
    ans: "Enchaînement immédiat de deux attaques",
    cat: "Waza",
  },
  { jp: "San dan waza", ans: "Trois attaques enchaînées", cat: "Waza" },
  { jp: "Ai nuki", ans: "Esquives simultanées", cat: "Waza" },
  {
    jp: "Ashi barai / gake",
    ans: "Fait de chasser ou d'accrocher la jambe de l'adversaire",
    cat: "Waza",
  },
  {
    jp: "Katate waza",
    ans: "Techniques portées en employant une seule main",
    cat: "Waza",
  },
  {
    jp: "Katsugi waza",
    ans: "Technique d'attaque en armant le shinai au dessus de l'épaule",
    cat: "Waza",
  },
  {
    jp: "Kiri ai",
    ans: "Combat sans merci au sabre (terme historique, non usité en kendô moderne)",
    cat: "Waza",
  },
  {
    jp: "Kiri otoshi",
    ans: "Forme d'Ôji waza : contre-attaque en tranchant l'arme adverse",
    cat: "Waza",
  },
  {
    jp: "Maki otoshi waza",
    ans: "Technique circulaire sur la Tsuka pour attaquer l'arme adverse",
    cat: "Waza",
  },
  { jp: "Oi uchi", ans: "Attaque en poursuite", cat: "Waza" },
  {
    jp: "Osae waza",
    ans: "Technique consistant à maintenir l'arme adverse avec sa propre arme",
    cat: "Waza",
  },
  { jp: "Uchi kaeshi", ans: "Autre appellation du Kiri kaeshi", cat: "Waza" },
  {
    jp: "Uchi komi",
    ans: "Exercices de répétitions sur des thèmes en rapport avec l'expérience",
    cat: "Waza",
  },
  {
    jp: "Uchi otoshi waza",
    ans: "Frapper le shinai adverse vers le bas puis riposter",
    cat: "Waza",
  },
  {
    jp: "Uke kata",
    ans: "Parer ou bloquer l'attaque adversaire avec son propre shinai",
    cat: "Waza",
  },

  // Entraînement
  { jp: "Kata", ans: "Formes codifiées d'entraînement", cat: "Entraînement" },
  {
    jp: "Kihon waza",
    ans: "Techniques de base ou fondamentales",
    cat: "Entraînement",
  },
  {
    jp: "Kiri kaeshi",
    ans: "Shômen + frappes Sayûmen alternées en avançant et reculant",
    cat: "Entraînement",
  },
  {
    jp: "Kakari geiko",
    ans: "Frappes intenses et rapides sur le Moto Dachi",
    cat: "Entraînement",
  },
  {
    jp: "Uchi komi geiko",
    ans: "Répétitions libres avec un Moto Dachi expérimenté",
    cat: "Entraînement",
  },
  {
    jp: "Gokaku geiko / Ji geiko",
    ans: "Assaut libre entre partenaires de même niveau",
    cat: "Entraînement",
  },
  {
    jp: "Hikitate geiko",
    ans: "Assaut guidé par un partenaire plus expérimenté",
    cat: "Entraînement",
  },
  {
    jp: "Shiai geiko",
    ans: "Compétition libre auto-arbitrée",
    cat: "Entraînement",
  },
  { jp: "Mitori geiko", ans: "Apprendre en observant", cat: "Entraînement" },
  {
    jp: "Moto dachi",
    ans: "Partenaire expérimenté qui conduit les attaques",
    cat: "Entraînement",
  },
  {
    jp: "Ai kakari geiko",
    ans: "Kakari geiko exécuté simultanément par deux partenaires confirmés",
    cat: "Entraînement",
  },
  {
    jp: "Kantoku",
    ans: "Entraîneur responsable de combattant(s) ou d'équipe(s)",
    cat: "Entraînement",
  },
  {
    jp: "Mawari geiko",
    ans: "Exercice continu où les pratiquants changent de partenaire à chaque signal",
    cat: "Entraînement",
  },
  { jp: "Renshû", ans: "Entraînement en général", cat: "Entraînement" },

  // Kata
  {
    jp: "Uchi dachi",
    ans: "Partenaire qui prend l'initiative dans les kata",
    cat: "Kata",
  },
  { jp: "Shi dachi", ans: "Partenaire qui riposte dans les kata", cat: "Kata" },
  {
    jp: "Kendô no kata",
    ans: "Formes codifiées de combat en dix séquences avec Uchi dachi et Shi dachi",
    cat: "Kata",
  },

  // Commandements
  { jp: "Hajime", ans: "Commencez", cat: "Commandements" },
  { jp: "Yame", ans: "Cessez", cat: "Commandements" },
  { jp: "Seiretsu", ans: "Alignez-vous", cat: "Commandements" },
  { jp: "Migi", ans: "Droite", cat: "Commandements" },
  { jp: "Hidari", ans: "Gauche", cat: "Commandements" },
  { jp: "Mae", ans: "Devant, en avant", cat: "Commandements" },
  { jp: "Ushiro", ans: "Arrière, derrière", cat: "Commandements" },
  { jp: "Ato", ans: "Derrière, en arrière", cat: "Commandements" },
  { jp: "Furi ageru", ans: "Brandir l'arme", cat: "Commandements" },
  { jp: "Kamae tô", ans: "Mettez-vous en garde", cat: "Commandements" },
  { jp: "Men o tore", ans: "Enlevez le casque", cat: "Commandements" },
  { jp: "Men o tsuke", ans: "Mettez le casque", cat: "Commandements" },
  { jp: "Osame tô", ans: "Rengainez", cat: "Commandements" },
  { jp: "Sage tô", ans: "Baissez le sabre", cat: "Commandements" },

  // Compétition
  { jp: "Shiai", ans: "Compétition, combat arbitré", cat: "Compétition" },
  { jp: "Ippon", ans: "Un point, une frappe valable", cat: "Compétition" },
  {
    jp: "Ippon shôbu",
    ans: "Victoire par un seul point valable",
    cat: "Compétition",
  },
  { jp: "Hansoku", ans: "Faute, infraction, pénalité", cat: "Compétition" },
  { jp: "Yûkô datotsu", ans: "Frappe efficace et valable", cat: "Compétition" },
  {
    jp: "Ai uchi",
    ans: "Frappe simultanée des deux combattants",
    cat: "Compétition",
  },
  {
    jp: "Aka",
    ans: "Rouge (couleur d'un des deux compétiteurs)",
    cat: "Compétition",
  },
  {
    jp: "Shiro",
    ans: "Blanc (couleur d'un des deux compétiteurs)",
    cat: "Compétition",
  },
  { jp: "Hikiwake", ans: "Égalité, match nul", cat: "Compétition" },
  {
    jp: "Sanbon shôbu",
    ans: "Victoire décidée en trois points (règle internationale)",
    cat: "Compétition",
  },
  {
    jp: "Shiaijô",
    ans: "Aire réglementaire de compétition",
    cat: "Compétition",
  },
  {
    jp: "Shôbu",
    ans: "« Victoire ou défaite » : annonce de l'arbitre quand il reste un point à marquer",
    cat: "Compétition",
  },
  {
    jp: "Shôbu ari",
    ans: "Annonce de l'arbitre central désignant le vainqueur",
    cat: "Compétition",
  },
  { jp: "Taikai", ans: "Réunion de compétitions, tournoi", cat: "Compétition" },

  // Arbitrage
  { jp: "Bassoku", ans: "Pénalité", cat: "Arbitrage" },
  {
    jp: "Bôryoku",
    ans: "Violence, brutalité ; pénalité de ce type en arbitrage",
    cat: "Arbitrage",
  },
  {
    jp: "Chûi",
    ans: "Attention ; en arbitrage, remarque avant pénalité",
    cat: "Arbitrage",
  },
  {
    jp: "Enchô",
    ans: "Prolongation déclarée par l'arbitre en cas d'égalité",
    cat: "Arbitrage",
  },
  {
    jp: "Fukushin",
    ans: "En compétition, les deux arbitres latéraux",
    cat: "Arbitrage",
  },
  { jp: "Gai", ans: "Atteinte, préjudice, tort", cat: "Arbitrage" },
  {
    jp: "Gôgi",
    ans: "En arbitrage, consultation entre les arbitres",
    cat: "Arbitrage",
  },
  { jp: "Hantai", ans: "Opposé, contraire", cat: "Arbitrage" },
  {
    jp: "Hantei",
    ans: "Jugement, décision de l'arbitre pour désigner le vainqueur",
    cat: "Arbitrage",
  },
  { jp: "Hata", ans: "Drapeau (utilisé par les arbitres)", cat: "Arbitrage" },
  { jp: "Igi", ans: "En arbitrage, réclamation", cat: "Arbitrage" },
  {
    jp: "Jôgai",
    ans: "Sortie des limites de l'aire de combat pendant le Shiai",
    cat: "Arbitrage",
  },
  {
    jp: "Oshi dashi",
    ans: "Fait de pousser un adversaire en dehors des limites du Shiaijô",
    cat: "Arbitrage",
  },
  { jp: "Shushin", ans: "En compétition, l'arbitre central", cat: "Arbitrage" },
  {
    jp: "Tsuki dashi",
    ans: "Pousser quelqu'un hors des limites du Shiaijô avec son shinai",
    cat: "Arbitrage",
  },

  // Mental
  { jp: "Me tsuke", ans: "Façon de regarder l'adversaire", cat: "Mental" },
  {
    jp: "Yotsu no byôki",
    ans: "Les quatre maux : surprise, confusion, crainte, doute",
    cat: "Mental",
  },
  { jp: "Aite", ans: "Le partenaire, l'adversaire", cat: "Mental" },
  {
    jp: "Atekko",
    ans: "Attitude consistant à tenter de frapper sans chercher à progresser",
    cat: "Mental",
  },
  {
    jp: "Hima",
    ans: "Temps libre, moment de vacuité ; instant favorable pour agir",
    cat: "Mental",
  },
  {
    jp: "Kikai",
    ans: "Chance, occasion de réalisation d'une frappe",
    cat: "Mental",
  },
  {
    jp: "Kokoro gamae",
    ans: "La garde du cœur ; être prêt à n'importe quelle éventualité",
    cat: "Mental",
  },
  {
    jp: "Sasou",
    ans: "Inviter, tenter de provoquer une attaque de l'adversaire",
    cat: "Mental",
  },

  // Les quatre maux
  {
    jp: "Mayou",
    ans: "L'un des quatre maux : état de confusion mentale",
    cat: "Les quatre maux",
  },
  {
    jp: "Odoroku",
    ans: "L'un des quatre maux : état de surprise créé par l'adversaire",
    cat: "Les quatre maux",
  },
  {
    jp: "Osoreru",
    ans: "L'un des quatre maux : la crainte de l'adversaire",
    cat: "Les quatre maux",
  },
  {
    jp: "Utagau",
    ans: "L'un des quatre maux : le doute qui perturbe la lucidité",
    cat: "Les quatre maux",
  },

  // Grades & Titres
  { jp: "Dan", ans: "Degré, niveau (après les Kyu)", cat: "Grades" },
  { jp: "Kyû", ans: "Échelon avant le 1er Dan (6ème au 1er)", cat: "Grades" },
  {
    jp: "Renshi",
    ans: "Titre de 1er niveau — Instructeur (6ème Dan)",
    cat: "Grades",
  },
  {
    jp: "Kyoshi",
    ans: "Titre de 2ème niveau — Professeur (7ème Dan)",
    cat: "Grades",
  },
  {
    jp: "Hanshi",
    ans: "Titre de 3ème niveau — Maître (8ème Dan)",
    cat: "Grades",
  },
  {
    jp: "Shihan",
    ans: "Appellation du maître responsable du dôjô ou de l'école",
    cat: "Grades",
  },
  { jp: "Shoshinsha", ans: "Débutant", cat: "Grades" },
  {
    jp: "Shoho",
    ans: "Les premiers pas, les premiers éléments de la pratique",
    cat: "Grades",
  },

  // Chiffres
  { jp: "Ichi", ans: "Un", cat: "Chiffres" },
  { jp: "Ni", ans: "Deux", cat: "Chiffres" },
  { jp: "San", ans: "Trois", cat: "Chiffres" },
  { jp: "Shi / Yon", ans: "Quatre", cat: "Chiffres" },
  { jp: "Go", ans: "Cinq", cat: "Chiffres" },
  { jp: "Roku", ans: "Six", cat: "Chiffres" },
  { jp: "Shichi", ans: "Sept", cat: "Chiffres" },
  { jp: "Hachi", ans: "Huit", cat: "Chiffres" },
  { jp: "Jû", ans: "Dix", cat: "Chiffres" },

  // Disciplines
  {
    jp: "Iaidô",
    ans: "Art du dégainement du sabre (pratique solo)",
    cat: "Disciplines",
  },
  {
    jp: "ZNKR",
    ans: "Fédération Japonaise de Kendo (Zen Nippon Kendô Renmei)",
    cat: "Disciplines",
  },

  // Organisations
  {
    jp: "Kokusai kendô renmei",
    ans: "Fédération Internationale de Kendô (I.K.F.)",
    cat: "Organisations",
  },
  {
    jp: "Ôshû kendô renmei",
    ans: "Fédération Européenne de Kendô (E.K.F.)",
    cat: "Organisations",
  },

  // Vocabulaire général
  {
    jp: "Man naka",
    ans: "Centre, central, milieu",
    cat: "Vocabulaire général",
  },
  { jp: "Naname", ans: "Oblique, en biais", cat: "Vocabulaire général" },
  { jp: "Naka", ans: "Dedans, l'intérieur", cat: "Vocabulaire général" },
  {
    jp: "Omote",
    ans: "Le côté face ; en kendô, côté gauche de l'adversaire",
    cat: "Vocabulaire général",
  },
  { jp: "Sayû", ans: "À gauche et à droite", cat: "Vocabulaire général" },
  { jp: "Shita", ans: "Bas, en bas", cat: "Vocabulaire général" },
  { jp: "Soto", ans: "Extérieur, à l'extérieur", cat: "Vocabulaire général" },
  { jp: "Uchi", ans: "Intérieur, à l'intérieur", cat: "Vocabulaire général" },
  { jp: "Ue", ans: "Haut, en haut", cat: "Vocabulaire général" },
  {
    jp: "Ura",
    ans: "Côté de l'envers ; en kendô, côté droit de l'adversaire",
    cat: "Vocabulaire général",
  },
];
