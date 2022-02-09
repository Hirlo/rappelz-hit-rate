document.onreadystatechange = () => {
    function getHitRate(attLevel, defLevel, accuracy, evasion) {
        let bonus = 0;
        let diffLevel = 2 * ( attLevel - defLevel );
        let evasionRatio = ( accuracy / evasion );
        let evasionRate = evasionRatio * Math.max(10, 88 + diffLevel);
        let hitRate = 7 + bonus + evasionRate;
        
        return Math.round(Math.min(100, hitRate));
    }

    function getRates( main, target ) {
        let mainLevel = main.level;
        let mainAccuracy = main.accuracy;
        let mainEvasion = main.evasion;
        let targetLevel = target.level;
        let targetAccuracy = target.accuracy;
        let targetEvasion = target.evasion;

        let toTarget = getHitRate( mainLevel, targetLevel, mainAccuracy, targetEvasion);
        let fromTarget = getHitRate( targetLevel, mainLevel, targetAccuracy, mainEvasion);

        return { toTarget: toTarget, fromTarget: fromTarget }
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
        var tablePVP = document.getElementById("resultTablePVP");
        clearTable(tablePVP)

        const character = new Object();
        character.level = Number(document.getElementById("charLvl").value);
        character.accuracy = Number(document.getElementById("charAccuracy").value);
        character.evasion = Number(document.getElementById("charEvasion").value);

        const characterTarget = new Object();
        characterTarget.level = Number(document.getElementById("charLvlTarget").value);
        characterTarget.accuracy = Number(document.getElementById("charAccuracyTarget").value);
        characterTarget.evasion = Number(document.getElementById("charEvasionTarget").value);

        showRatesPVP(character, characterTarget)

        var requestURL = './mobs.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function() {
            var mobs = request.response;
            for (var mob of mobs) {
                showRatesPVE(character, mob);
            }
          }
    }

    document.getElementById("charDetails").onsubmit = (e) => {
        e.preventDefault();
        calculate();
    };

};