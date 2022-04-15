document.onreadystatechange = () => {
    function hitRate(attLevel, defLevel, accuracy, evasion) {
        let bonus = 0;
        let diffLevel = 2 * ( attLevel - defLevel );
        let evasionRatio = ( accuracy / evasion );
        let evasionRate = evasionRatio * Math.max(10, 88 + diffLevel);
        let hitRate = 7 + bonus + evasionRate;
        
        return Math.round(Math.min(100, hitRate));
    }

    function getHitRate( main, target ) {
        let mainLevel = main.level;
        let mainAccuracy = main.accuracy;
        let mainEvasion = main.evasion;
        let targetLevel = target.level;
        let targetAccuracy = target.accuracy;
        let targetEvasion = target.evasion;

        let char2target = hitRate( mainLevel, targetLevel, mainAccuracy, targetEvasion);
        let target2char = hitRate( targetLevel, mainLevel, targetAccuracy, mainEvasion);

        return { char2target: char2target, target2char: target2char }
    }


    function showRatesPVE(character, mob) {
        var character = character;
        var mob = mob;
        
        console.log(mob.name)

        results = getRates(character, mob);

        var table = document.getElementById("resultTablePVE");

        var row = table.insertRow(-1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        
        cell1.innerHTML = mob.location;
        cell2.innerHTML = mob.name;
        cell3.innerHTML = mob.level;
        cell4.innerHTML = results.toTarget + "%";
        cell5.innerHTML = results.fromTarget + "%";
      }

      function showRatesPVP(character, characterTarget) {
        var character = character;
        var characterTarget = characterTarget;
        
        console.log(characterTarget.name)

        results = getRates(character, characterTarget);

        var table = document.getElementById("resultTablePVP");

        var row = table.insertRow(-1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        
        cell1.innerHTML = results.toTarget + "%";
        cell2.innerHTML = results.fromTarget + "%";
      }

      function clearTable(table) {
        var rows = table.rows;
        var i = rows.length;
        while (--i) {
          rows[i].parentNode.removeChild(rows[i]);
          // or
          // table.deleteRow(i);
        }
      }

    function calculate() {

        var tablePVE = document.getElementById("resultTablePVE");
        clearTable(tablePVE)
        // var tablePVP = document.getElementById("resultTablePVP");
        // clearTable(tablePVP)

        const character = new Object();
        character.level = Number(document.getElementById("charLvl").value);
        character.attaque = Number(document.getElementById("charAtq").value);
        character.defense = Number(document.getElementById("charDef").value);
        character.accuracy = Number(document.getElementById("charAccuracy").value);
        character.evasion = Number(document.getElementById("charEvasion").value);
        character.blocage = Number(document.getElementById("charBloc").value);
        character.blocagePercent = Number(document.getElementById("charBlocPercent").value);
        character.blocagePerfect = Number(document.getElementById("charBlocPerfect").value);

        const target = new Object();
        target.level = Number(document.getElementById("targetLvl").value);
        target.attaque = Number(document.getElementById("targetAtq").value);
        target.defense = Number(document.getElementById("targetDef").value);
        target.accuracy = Number(document.getElementById("targetAccuracy").value);
        target.evasion = Number(document.getElementById("targetEvasion").value);
        target.blocage = Number(document.getElementById("targetBloc").value);
        target.blocagePercent = Number(document.getElementById("targetBlocPercent").value);
        target.blocagePerfect = Number(document.getElementById("targetBlocPerfect").value);

        const hitRate = getHitRate(character, target);
        const char2targetHitRate = hitRate.char2target + "%";
        const target2charHitRate = hitRate.target2char + "%";

        const BlocRate = getHitRate(character, target);
        const char2targetBlocRate = BlocRate.char2target + "%";
        const target2charBlocRate = BlocRate.target2char + "%";
        
        const damages = getHitRate(character, target);
        const char2targetDamages = damages.char2target + "%";
        const target2charDamages = damages.target2char + "%";

        document.getElementById("char2targetHitRate").innerHTML = char2targetHitRate;
        document.getElementById("char2targetBlocRate").innerHTML = char2targetBlocRate;
        document.getElementById("char2targetDamages").innerHTML = char2targetDamages;
        
        document.getElementById("target2charHitRate").innerHTML = target2charHitRate;
        document.getElementById("target2charBlocRate").innerHTML = target2charBlocRate;
        document.getElementById("target2charDamages").innerHTML = target2charDamages;

        // showRatesPVP(character, target)

        // var requestURL = './mobs.json';
        // var request = new XMLHttpRequest();
        // request.open('GET', requestURL);
        // request.responseType = 'json';
        // request.send();

        // request.onload = function() {
        //     var mobs = request.response;
        //     for (var mob of mobs) {
        //         showRatesPVE(character, mob);
        //     }
        //   }
    }

    document.getElementById("charDetails").onsubmit = (e) => {
        e.preventDefault();
        calculate();
    };

};