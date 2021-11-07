<template>
  <div>
    <div v-if="type == 'tel'" class="wrapInputA">
      <div v-if="title" class="titlePhoneInputA">{{ title }}</div>
      <div class="wrapPhoneInputA">
        <div class="wrapCountryCodePhoneInputA">
          <div class="countryCodePhoneInputA" v-on:click="showSelectCountyCodeInputA()">{{ codeCountry }}</div>
          <div class="wrapSelectCountryCodePhoneInputA">
            <div class="wrapSearchSelectCountryCodePhoneInputA">
              <div class="logoSearchSelectCountryCodePhoneInputA"></div>
              <input class="searchSelectCountryCodePhoneInputA" type="text" v-on:input="searchCountryCode()" />
            </div>
            <div class="listSelectCountryCodePhoneInputA">
              <div v-for="option in listOfCallingCodesCountryInputA" v-bind:value="option[0]+' '+option[1]" v-on:click="chooseCountryCodeInputA()" class="optionSelectCountryCodePhoneInputA">
                <div class="codeSelectCountryCodePhoneInputA">{{ option[0] }}</div>
                <div v-if="option[2] != ''" class="flagSelectCountryCodePhoneInputA" v-bind:style="{backgroundImage: 'url(/node_modules/@vgaidadei/inputv/src/'+pathFlagsInputA+'/'+option[2]+')'}"></div>
                <div v-else class="flagSelectCountryCodePhoneInputA" v-bind:style="{backgroundImage: 'url(/node_modules/@vgaidadei/inputv/src/'+pathFlagsInputA+'/unknown.png'}"></div>
                <div class="nameSelectCountryCodePhoneInputA">{{ option[1] }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="wrapNumberPhoneInputA">
          <input class="numberPhoneInputA" type="text" v-bind:value="phoneNumber" maxlength="16" v-on:input="oninputPhoneNumberInputA()" />
        </div>
      </div>
    </div>

    <div v-else-if="type == 'text'" class="wrapInputA" v-on:mousedown="openTextInputV()" v-on:touchstart="openTextInputV()">
      <div v-if="title && value" class="titleTextInputA" ontop="true">{{ title }}</div>
      <div v-else-if="title && !value" class="titleTextInputA" ontop="false">{{ title }}</div>
      <input type="text" class="inputTextInputV" v-on:blur="hideTextInputV()" v-bind:value="value" />
    </div>

    <div v-else-if="type == 'select'" class="wrapInputA">
      <div v-if="title" class="titleSelectInputA">{{ title }}</div>
      <div class="wrapListSelectInputA">
        <input v-bind:value="getSelectValue()" class="displaySelectInputA" v-on:focus="showSelectListInputV()" v-on:blur="hideSelectListInputV()" v-on:input="searchSelectInputV()" />
        <div class="listSelectInputA">
          <option v-for="option in options" class="optionSelectInputA" v-bind:value="option.value" v-on:mousedown="chooseSelectListInputV()">{{ option.name }}</option>
        </div>
      </div>
    </div>

    <div v-else-if="type == 'checkbox'" class="wrapInputA">
      <div class="rowCheckboxInputV" v-on:click="switchCheckboxInputV()">
        <div class="icoCheckboxInputV" v-bind:active="value"></div>
        <div v-if="title" class="titleCheckboxInputA">{{ title }}</div>
      </div>
    </div>

    <div v-else-if="type == 'radio'" class="wrapInputA">
      <div class="rowRadioInputV" v-on:click="switchRadioInputV()">
        <div class="icoRadioInputV" v-bind:active="value" ><div class="circleRadioInputV"></div></div>
        <div v-if="title" class="titleRadioInputA">{{ title }}</div>
      </div>
    </div>

    <!-- <div v-else-if="type == 'other'">AHHAH</div> -->

    <div v-else>
      <div class="notType">Type attribute not specified (inputV)</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type: this.$attrs['type'],
        value: this.$attrs['value'],
        title: this.$attrs['title'],
        options: this.getSelectOptions(),
        otherSelect: this.$attrs['other'],
        anchor: this.$attrs['anchor'],
        pathFlagsInputA: pathFlagsInputA,
        listOfCallingCodesCountryInputA: listOfCallingCodesCountryInputA,
      };
    },
    mounted: function() {
      var divs = document.querySelectorAll(".rowRadioInputV");
      var anchors = [];
      for (var i = 0; i < divs.length; i++) {
        var add = true;
        for (var j = 0; j < anchors.length; j++) {
          if (anchors[j] == divs[i].parentNode.parentNode.getAttribute("anchor")) {
            add = false;
            break;
          }
        }
        if (add) {
          anchors.push(divs[i].parentNode.parentNode.getAttribute("anchor"));
        }
      }

      for (var i = 0; i < anchors.length; i++) {
        var div = document.querySelectorAll("div[anchor='"+anchors[i]+"'] .wrapInputA .rowRadioInputV");
        if (anchors[i] === null) {
          div = [];
          for (var i = 0; i < divs.length; i++) {
            if (divs[i].parentNode.parentNode.getAttribute("anchor") === null) {
              div.push(divs[i]);
            }
          }
        }

        var active = false;
        var exitsActive = false;
        for (var j = 0; j < div.length; j++) {
          if (div[j].querySelector(".wrapInputA .rowRadioInputV .icoRadioInputV").getAttribute("active") == "true") {
            exitsActive = true;
          }
          if (!active && div[j].querySelector(".wrapInputA .rowRadioInputV .icoRadioInputV").getAttribute("active") == "true") {
            active = true;
            continue;
          }
          div[j].querySelector(".wrapInputA .rowRadioInputV .icoRadioInputV").setAttribute("active", "false");
        }
        if (!exitsActive) {
          div[0].querySelector(".wrapInputA .rowRadioInputV .icoRadioInputV").setAttribute("active", "true");
        }

      }

      var tels = document.querySelectorAll(".wrapPhoneInputA");
      for (var i = 0; i < tels.length; i++) {
        var country =  tels[i].querySelector(".wrapCountryCodePhoneInputA .countryCodePhoneInputA").innerHTML;
        country = country.replace(/ /g, "");
        var number = tels[i].querySelector(".wrapNumberPhoneInputA .numberPhoneInputA").value;
        number = number.replace(/[)(_ \-)]/g, "");
        tels[i].parentNode.parentNode.setAttribute("value", country+number);
      }

      var checks = document.querySelectorAll(".rowCheckboxInputV");
      for (var i = 0; i < checks.length; i++) {
        var active = "false";
        if (checks[i].querySelector(".icoCheckboxInputV").getAttribute("active") == "true") { active = "true"; }
        checks[i].parentNode.parentNode.setAttribute("value", active);
      }

      var radios = document.querySelectorAll(".rowRadioInputV");
      for (var i = 0; i < radios.length; i++) {
        var active = "false";
        if (radios[i].querySelector(".icoRadioInputV").getAttribute("active") == "true") { active = "true"; }
        radios[i].parentNode.parentNode.setAttribute("value", active);
      }
    },
    methods: {
      switchRadioInputV() {
        var el = event.target;
        if (el.getAttribute("class") == "rowRadioInputV") {
          el = event.target;
        } else if (el.getAttribute("class") == "icoRadioInputV") {
          el = event.target.parentNode;
        } else if (el.getAttribute("class") == "titleRadioInputA") {
          el = event.target.parentNode;
        }  else if (el.getAttribute("class") == "circleRadioInputV") {
          el = event.target.parentNode.parentNode;
        }
        var anchor = el.parentNode.parentNode.getAttribute("anchor");
        var divs = [];
        if (anchor === null) {
          var div = document.querySelectorAll("div .wrapInputA .rowRadioInputV");
          for (var i = 0; i < div.length; i++) {
            if (div[i].parentNode.parentNode.getAttribute("anchor") === null) {
              divs.push(div[i]);
            }
          }
        } else {
          divs = document.querySelectorAll("div[anchor='"+anchor+"'] .wrapInputA .rowRadioInputV");
        }
        for (var i = 0; i < divs.length; i++) {
          if (divs[i] == el) {
            divs[i].querySelector(".icoRadioInputV").setAttribute("active", "true");
            divs[i].parentNode.parentNode.setAttribute("value", "true");
          } else {
            divs[i].querySelector(".icoRadioInputV").setAttribute("active", "false");
            divs[i].parentNode.parentNode.setAttribute("value", "false");
          }
        }
      },
      switchCheckboxInputV() {
        var el = null;
        if (event.target.getAttribute("class") == "rowCheckboxInputV") {
          el = event.target;
        } else if (event.target.getAttribute("class") == "icoCheckboxInputV") {
          el = event.target.parentNode;
        } else if (event.target.getAttribute("class") == "titleCheckboxInputA") {
          el = event.target.parentNode;
        }
        if (el.querySelector(".icoCheckboxInputV").getAttribute("active") == "true") {
          el.querySelector(".icoCheckboxInputV").setAttribute("active", "false");
        } else {
          el.querySelector(".icoCheckboxInputV").setAttribute("active", "true");
        }

        el.parentNode.parentNode.setAttribute("value", el.querySelector(".icoCheckboxInputV").getAttribute("active"));
      },
      searchSelectInputV() {
        var options = event.target.parentNode.querySelector(".listSelectInputA").querySelectorAll(".optionSelectInputA");
        for (var i = 0; i < options.length; i++) {
          var regExp = new RegExp('.*'+event.target.value.toLowerCase()+'.*', "g");
          if (options[i].innerHTML.toLowerCase().match(regExp)) {
            options[i].style.display = "flex";
          } else {
            options[i].style.display = "none";
          }
        }
      },
      getSelectValue() {
        if (!this.value) {
          return this.options[0].name;
        } else {
          return this.value;
        }
      },
      chooseSelectListInputV() {
        event.target.parentNode.parentNode.querySelector(".displaySelectInputA").value = event.target.innerHTML;
      },
      getSelectOptions() {
        if (!this.$slots.default) { return ""; }
        var options = [];
        for (var i = 0; i < this.$slots.default.length; i++) {
          if (!this.$slots.default[i].children) { continue; }
          var opt = {
            name: this.$slots.default[i].children[0].text,
            value: ""
          };
          if (this.$slots.default[i].data && this.$slots.default[i].data.attrs) {
            opt.value = this.$slots.default[i].data.attrs.value;
          }
          options.push(opt);
        }
        return options;
      },
      hideSelectListInputV() {
        event.target.parentNode.querySelector(".listSelectInputA").style.display = "none";
        if (this.otherSelect != "true") {
          var clear = true;
          var options = event.target.parentNode.querySelector(".listSelectInputA").querySelectorAll(".optionSelectInputA");
          for (var i = 0; i < options.length; i++) {
            if (options[i].innerHTML.toLowerCase() == event.target.value.toLowerCase()) {
              clear = false;
              break;
            }
          }
          if (clear) {
            event.target.value = options[0].innerHTML;
          }
        }

        event.target.parentNode.parentNode.parentNode.setAttribute("value", event.target.value);
      },
      showSelectListInputV() {
        var options = event.target.parentNode.querySelector(".listSelectInputA").querySelectorAll(".optionSelectInputA");
        for (var i = 0; i < options.length; i++) {
          options[i].style.display = "flex";
        }
        event.target.parentNode.querySelector(".listSelectInputA").style.display = "flex";
      },
      hideTextInputV() {
        if (event.target.value == "" && event.target.parentNode.querySelector(".titleTextInputA")) {
          event.target.parentNode.querySelector(".titleTextInputA").setAttribute("ontop", "false");
        }

        event.target.parentNode.parentNode.setAttribute("value", event.target.value);
      },
      openTextInputV() {
        var el = null;
        if (event.target.getAttribute("class") == "wrapInputA") {
          el = event.target;
        } else if (event.target.getAttribute("class") == "titleTextInputA") {
          el = event.target.parentNode;
        } else if (event.target.getAttribute("class") == "inputTextInputV") {
          el = event.target.parentNode;
        }
        if (el.querySelector(".titleTextInputA") && el.querySelector(".titleTextInputA").getAttribute("ontop") == "false") {
          setTimeout(function() { el.querySelector(".inputTextInputV").focus(); }, 200);
          el.querySelector(".titleTextInputA").setAttribute("ontop", "true");
        }
      },
      chooseCountryCodeInputA() {
        var value = "";
        var el = null;
        if (event.target.getAttribute("value")) {
          el = event.target.querySelector(".codeSelectCountryCodePhoneInputA");
        } else if (event.target.parentNode.getAttribute("value")) {
          el = event.target.parentNode.querySelector(".codeSelectCountryCodePhoneInputA");
        }
        value = el.innerHTML;
        el.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".wrapCountryCodePhoneInputA .countryCodePhoneInputA").innerHTML = value;
        el.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".wrapCountryCodePhoneInputA .wrapSelectCountryCodePhoneInputA").style.display = "none";
        refreshWidthInputA();

        var tel = el.parentNode.parentNode.parentNode.parentNode.parentNode;
        var country =  tel.querySelector(".wrapCountryCodePhoneInputA .countryCodePhoneInputA").innerHTML;
        country = country.replace(/ /g, "");
        var number = tel.querySelector(".wrapNumberPhoneInputA .numberPhoneInputA").value;
        number = number.replace(/[)(_ \-)]/g, "");
        tel.parentNode.parentNode.setAttribute("value", country+number);
      },
      searchCountryCode() {
        var value = event.target.value;
        if (value == "") {
          var options = document.querySelectorAll(".optionSelectCountryCodePhoneInputA");
          for (var i = 0; i < options.length; i++) {
            options[i].style.display = "flex";
          }
          return;
        }
        value = value.replace(/[ ]+/g, " ");
        value = value.split(" ");
        for (var i = 0; i < value.length; i++) {
          if (value[i] == "") { value.splice(i, 1); }
        }
        for (var i = 0; i < value.length; i++) {
          value[i] = value[i].toLowerCase();
          for (var j = 0; j < value[i].length; j++) {
            if (value[i][j] == "+") {
              value[i] = value[i].substr(0, j)+"\\"+value[i].substr(j);
              j++;
            }
          }
        }
        var options = document.querySelectorAll(".optionSelectCountryCodePhoneInputA");
        for (var i = 0; i < options.length; i++) {
          options[i].style.display = "none";
          for (var j = 0; j < value.length; j++) {
            var regExp = new RegExp('.*'+value[j]+'.*', "g");
            var v = options[i].getAttribute("value").toLowerCase();
            if (v.match(regExp)) {
              options[i].style.display = "flex";
              break;
            }
          }
        }
      },
      showSelectCountyCodeInputA() {
        var selects = document.querySelectorAll(".wrapSelectCountryCodePhoneInputA");
        for (var i = 0; i < selects.length; i++) {
          selects[i].style.display = "none";
        }
        event.target.parentNode.querySelector(".wrapSelectCountryCodePhoneInputA").style.display = "flex";
      },
      oninputPhoneNumberInputA() {
        var e = event;
        var el = event.target;
        var prev = el.getAttribute("previousInputA");
        if (!prev) { prev = "(___) ___ __-__" }
        var pos = e.target.selectionStart;

        if (e.data != null && !/^[0-9]$/g.test(e.data)) {
          el.value = prev;
          el.setSelectionRange(pos-1, pos-1);
          return;
        }

        if (el.value == "") {
          el.value = "___) ___ __-__";
          el.setSelectionRange(1, 1);
        }

        if (el.value.length < 14) {
          el.value = prev;
          el.setSelectionRange(pos, pos);
          return;
        }

        if (e.inputType == "deleteContentBackward") {
          if (pos == 0) {
            el.value = "("+el.value;
            el.setSelectionRange(pos+1, pos+1);
          } else if (pos == 4) {
            el.value = el.value.substr(0, pos)+")"+el.value.substr(pos);
            el.setSelectionRange(pos, pos);
          } else if (pos == 5) {
            el.value = el.value.substr(0, pos)+" "+el.value.substr(pos);
            el.setSelectionRange(pos, pos);
          } else if (pos == 9) {
            el.value = el.value.substr(0, pos)+" "+el.value.substr(pos);
            el.setSelectionRange(pos, pos);
          } else if (pos == 12) {
            el.value = el.value.substr(0, pos)+"-"+el.value.substr(pos);
            el.setSelectionRange(pos, pos);
          } else {
            el.value = el.value = el.value.substr(0, pos)+"_"+el.value.substr(pos);
            el.setSelectionRange(pos, pos);
          }
          return;
        }

        if (el.value[pos] == "(") {
          el.value = "("+el.value.substr(0, 1)+el.value.substr(2);
          pos++;
        } else if (el.value[pos] == ")") {
          el.value = el.value.substr(0, 4)+") "+el.value.substr(4, 1)+el.value.substr(7);
          pos += 2;
        } else if (el.value[pos] == " ") {
          el.value = el.value.substr(0, 9)+" "+el.value.substr(9, 1)+el.value.substr(11);
          pos += 1;
        } else if (el.value[pos] == "-") {
          el.value = el.value.substr(0, 12)+"-"+el.value.substr(12, 1)+el.value.substr(14);
          pos += 1;
        }

        if (el.value[pos] == "_") {
          el.value = el.value.substr(0, pos)+el.value.substr(pos+1);
          el.setSelectionRange(pos, pos);
        } else {
          el.value = el.value.substr(0, pos-1)+el.value.substr(pos);
          el.setSelectionRange(pos-1, pos-1);
        }

        el.setAttribute("previousInputA", el.value);

        var tel = el.parentNode.parentNode;
        var country =  tel.querySelector(".wrapCountryCodePhoneInputA .countryCodePhoneInputA").innerHTML;
        country = country.replace(/ /g, "");
        var number = tel.querySelector(".wrapNumberPhoneInputA .numberPhoneInputA").value;
        number = number.replace(/[)(_ \-)]/g, "");
        tel.parentNode.parentNode.setAttribute("value", country+number);
      }
    },
    computed: {
      /*options: function() {
        var answer = "";
        for (var i = 0; i < this.$slots.default.length; i++) {
          if (!this.$slots.default[i].children) { continue; }
          var value = "";
          if (this.$slots.default[i].data && this.$slots.default[i].data.attrs) {
            value = this.$slots.default[i].data.attrs.value;
          }
          answer += "<option value='"+value+"' class=\"optionSelectInputA\" style:hover='background-color: #ccc;' onmousedown='this.parentNode.parentNode.querySelector(\".displaySelectInputA\").value = this.innerHTML'>"+this.$slots.default[i].children[0].text+"</option>";
        }
        return answer;
      },*/
      codeCountry: function () {
        if (!this.value) {
          return "+1";
        } else {
          var val = this.value.split("|")[0];
          var flag = false;
          for (var i = 0; i < listOfCallingCodesCountryInputA.length; i++) {
            if (listOfCallingCodesCountryInputA[i][0] == val) {
              flag = true;
              break;
            }
          }
          if (flag) {
            return this.value.split("|")[0];
          } else {
            return "+1";
          }
        }
      },
      phoneNumber: function() {
        if (!this.value) {
          return "(___) ___ __-__";
        } else {
          var val = this.value.split("|")[1];
          if (!val) {
            return "(___) ___ __-__";
          } else {
            val = val.split(" ");
            if (val.length == 3) {
              val[2] = val[2].split("-");
              if (val[2].length == 2) {
                while (val[0].length < 3) { val[0] = "_"+val[0] }
                while (val[1].length < 3) { val[1] = "_"+val[1] }
                while (val[2][0].length < 2) { val[2][0] = "_"+val[2][0] }
                while (val[2][1].length < 2) { val[2][1] = "_"+val[2][1] }
                return "("+val[0]+") "+val[1]+" "+val[2][0]+"-"+val[2][1];
              } else {
                return "(___) ___ __-__";
              }
            } else {
              return "(___) ___ __-__";
            }
          }
        }
      }
    }
  }

  window.addEventListener("load", function() {
    refreshWidthInputA();
  });

  function isChild(parent, child) {
    var node = child.parentNode;
    while (node != null) {
       if (node == parent) {
           return true;
       }
       node = node.parentNode;
    }
    return false;
  }
  window.addEventListener("mousedown", function(e) {
    var selects = document.querySelectorAll(".wrapSelectCountryCodePhoneInputA");
    for (var i = 0; i < selects.length; i++) {
      if (selects[i] != e.target && !isChild(selects[i], e.target) && selects[i].style.display == 'flex') {
        selects[i].style.display = "none";
      }
    }
  });

  function refreshWidthInputA() {
    var wraps = document.querySelectorAll(".wrapPhoneInputA");
    for (var i = 0; i < wraps.length; i++) {
      var chl = wraps[i].children;
      wraps[i].style.maxWidth = chl[0].querySelector(".countryCodePhoneInputA").innerHTML.length*12+140+"px";
      wraps[i].style.minWidth = chl[0].querySelector(".countryCodePhoneInputA").innerHTML.length*12+140+"px";
    }
  }

  var pathFlagsInputA = "assets/flags";
  var listOfCallingCodesCountryInputA = [
    ["+1", "Canada", "canada.webp"],
    ["+1", "United States", "us.webp"],
    ["+1 340", "United States Virgin Islands", "virginIslands.webp"],
    ["+1 670", "Northern Mariana Islands", "northernMarianaIslands.webp"],
    ["+1 671", "Guam", "guam.webp"],
    ["+1 684", "American Samoa", "americanSamoa.webp"],
    ["+1 787", "Puerto Rico", "puertoRico.webp"],
    ["+1 939", "Puerto Rico", "puertoRico.webp"],
    ["+1 242", "Bahamas", "bahamas.webp"],
    ["+1 246", "Barbados", "barbados.webp"],
    ["+1 264", "Anguilla", "anguilla.webp"],
    ["+1 268", "Antigua and Barbuda", "antiguaBarbuda.webp"],
    ["+1 284", "British Virgin Islands", "britishVirginIslands.webp"],
    ["+1 345", "Cayman Islands", "caymanIslands.webp"],
    ["+1 441", "Bermuda", "bermuda.webp"],
    ["+1 473", "Grenada", "grenada.webp"],
    ["+1 649", "Turks and Caicos Islands", "turksCaicosIslands.webp"],
    ["+1 658", "Jamaica", "jamaica.webp"],
    ["+1 876", "Jamaica", "jamaica.webp"],
    ["+1 664", "Montserrat", "montserrat.webp"],
    ["+1 721", "Sint Maarten", "sintMaarten.webp"],
    ["+1 758", "Saint Lucia", "saintLucia.webp"],
    ["+1 767", "Dominica", "dominica.webp"],
    ["+1 784", "Saint Vincent and the Grenadines", "saintVincentGrenadines.webp"],
    ["+1 809", "Dominican Republic", "dominicanRepublic.webp"],
    ["+1 829", "Dominican Republic", "dominicanRepublic.webp"],
    ["+1 849", "Dominican Republic", "dominicanRepublic.webp"],
    ["+1 868", "Trinidad and Tobago", "trinidadTobago.webp"],
    ["+1 869", "Saint Kitts and Nevis", "saintKittsNevis.webp"],
    ["+20", "Egypt", "egypt.webp"],
    ["+211", "South Sudan", "southSudan.png"],
    ["+212", "Morocco", "morocco.webp"],
    ["+213", "Algeria", "algeria.webp"],
    ["+216", "Tunisia", "tunisia.webp"],
    ["+218", "Libya", "libya.webp"],
    ["+220", "Gambia", "gambia.webp"],
    ["+221", "Senegal", "senegal.webp"],
    ["+222", "Mauritania", "mauritania.webp"],
    ["+223", "Mali", "mali.webp"],
    ["+224", "Guinea", "guinea.webp"],
    ["+225", "Ivory Coast", "ivoryCoast.webp"],
    ["+226", "Burkina Faso", "burkinaFaso.webp"],
    ["+227", "Niger", "nigeria.webp"],
    ["+228", "Togo", "togo.webp"],
    ["+229", "Benin", "benin.webp"],
    ["+230", "Mauritius", "mauritius.webp"],
    ["+231", "Liberia", "liberia.webp"],
    ["+232", "Sierra Leone", "sierraLeone.webp"],
    ["+233", "Ghana", "ghana.webp"],
    ["+234", "Nigeria", "niger.webp"],
    ["+235", "Chad", "chad.webp"],
    ["+236", "Central African Republic", "centralAfricanRepublic.webp"],
    ["+237", "Cameroon", "cameroon.webp"],
    ["+238", "Cape Verde", "capeVerde.webp"],
    ["+239", "Sao Tome and Principe", "saoTomePrincipe.webp"],
    ["+240", "Equatorial Guinea", "equatorialGuinea.webp"],
    ["+241", "Gabon", "gabon.webp"],
    ["+242", "Republic of the Congo", "republicCongo.webp"],
    ["+243", "Democratic Republic of the Congo", "democraticRepublicCongo.webp"],
    ["+244", "Angola", "angola.webp"],
    ["+245", "Guinea-Bissau", "guineaBissau.webp"],
    ["+246", "British Indian Ocean Territory", "britishIndianOceanTerritory.webp"],
    ["+247", "Ascension Island", "ascensionIsland.webp"],
    ["+248", "Seychelles", "seychelles.webp"],
    ["+249", "Sudan", "sudan.webp"],
    ["+250", "Rwanda", "rwanda.webp"],
    ["+251", "Ethiopia", "ethiopia.webp"],
    ["+252", "Somalia", "somalia.webp"],
    ["+253", "Djibouti", "djibouti.webp"],
    ["+254", "Kenya", "kenya.webp"],
    ["+255", "Tanzania", "tanzania.webp"],
    ["+255 24", "Zanzibar", "zanzibar.webp"],
    ["+256", "Uganda", "uganda.webp"],
    ["+257", "Burundi", "burundi.webp"],
    ["+258", "Mozambique", "mozambique.webp"],
    ["+260", "Zambia", "zambia.webp"],
    ["+261", "Madagascar", "madagascar.webp"],
    ["+262", "Reunion", "reunion.webp"],
    ["+262 269", "Mayotte", "reunion.webp"],
    ["+262 639", "Mayotte", "reunion.webp"],
    ["+263", "Zimbabwe", "zimbabwe.webp"],
    ["+264", "Namibia", "namibia.webp"],
    ["+265", "Malawi", "malawi.webp"],
    ["+266", "Lesotho", "lesotho.webp"],
    ["+267", "Botswana", "botswana.webp"],
    ["+268", "Eswatini", "eswatini.webp"],
    ["+27", "South Africa", "southAfrica.webp"],
    ["+290", "Saint Helena", "saintHelena.webp"],
    ["+290 8", "Tristan da Cunha", "tristanDaCunha.webp"],
    ["+291", "Eritrea", "eritrea.webp"],
    ["+297", "Aruba", "aruba.webp"],
    ["+298", "Faroe Islands", "faroeIslands.webp"],
    ["+299", "Greenland", "greenland.webp"],
    ["+30", "Greece", "greece.webp"],
    ["+31", "Netherlands", "netherlands.webp"],
    ["+32", "Belgium", "belgium.webp"],
    ["+33", "France", "france.webp"],
    ["+34", "Spain", "spain.webp"],
    ["+350", "Gibraltar", "gibraltar.webp"],
    ["+351", "Portugal", "portugal.webp"],
    ["+351 291", "Madeira", "madeira.webp"],
    ["+351 292", "Azores", "azores.webp"],
    ["+351 295", "Azores", "azores.webp"],
    ["+351 296", "Azores", "azores.webp"],
    ["+352", "Luxembourg", "luxembourg.webp"],
    ["+353", "Ireland", "ireland.webp"],
    ["+354", "Iceland", "ireland.webp"],
    ["+355", "Albania", "albania.webp"],
    ["+356", "Malta", "malta.webp"],
    ["+357", "Cyprus", "cyprus.webp"],
    ["+358", "Finland", "finland.webp"],
    ["+358 18", "Aland Islands", "alandIslands.webp"],
    ["+359", "Bulgaria", "bulgaria.webp"],
    ["+36", "Hungary", "hungary.webp"],
    ["+370", "Lithuania", "lithuania.webp"],
    ["+371", "Latvia", "latvia.webp"],
    ["+372", "Estonia", "estonia.webp"],
    ["+373", "Moldova", "moldova.webp"],
    ["+374", "Armenia", "armenia.webp"],
    ["+374 47", "Artsakh", "artsakh.webp"],
    ["+374 97", "Artsakh", "artsakh.webp"],
    ["+375", "Belarus", "belarus.webp"],
    ["+376", "Andorra", "andorra.webp"],
    ["+377", "Monaco", "monaco.webp"],
    ["+378", "San Marino", "sanMarino.webp"],
    ["+379", "Vatican City", "vaticanCity.webp"],
    ["+380", "Ukraine", "ukraine.webp"],
    ["+381", "Serbia", "serbia.webp"],
    ["+382", "Montenegro", "montenegro.webp"],
    ["+383", "Kosovo", "kosovo.webp"],
    ["+385", "Croatia", "croatia.webp"],
    ["+386", "Slovenia", "slovenia.webp"],
    ["+387", "Bosnia and Herzegovina", "bosniaHerzegovina.webp"],
    ["+389", "North Macedonia", "northMacedonia.webp"],
    ["+39", "Italy", "italy.webp"],
    ["+39 06 698", "Vatican City", "vaticanCity.webp"],
    ["+39 0549", "San Marino", "sanMarino.webp"],
    ["+41 91", "Italy", "italy.webp"],
    ["+40", "Romania", "romania.webp"],
    ["+41", " Switzerland", "switzerland.webp"],
    ["+41 91", "Italy", "italy.webp"],
    ["+420", "Czech Republic", "czechRepublic.webp"],
    ["+421", "Slovakia", "slovakia.webp"],
    ["+423", "Liechtenstein", "liechtenstein.webp"],
    ["+43", "Austria", "austria.webp"],
    ["+44", "United Kingdom", "unitedKingdom.webp"],
    ["+44 1481", "Guernsey", "guernsey.webp"],
    ["+44 1534", "Jersey", "jersey.webp"],
    ["+44 1624", "Isle of Man", "isleMan.webp"],
    ["+45", "Denmark", "denmark.webp"],
    ["+46", "Sweden", "sweden.webp"],
    ["+47", "Norway", "norway.webp"],
    ["+47 79", "Svalbard", "norway.webp"],
    ["+48", "Poland", "poland.webp"],
    ["+49", "Germany", "germany.webp"],
    ["+500", "Falkland Islands", "falklandIslands.webp"],
    ["+500", "South Georgia", "southGeorgiaSouthSandwichIslands.webp"],
    ["+500", "South Sandwich Islands", "southGeorgiaSouthSandwichIslands.webp"],
    ["+501", "Belize", "belize.webp"],
    ["+502", "Guatemala", "guatemala.webp"],
    ["+503", "El Salvador", "elSalvador.webp"],
    ["+504", "Honduras", "honduras.webp"],
    ["+505", "Nicaragua", "nicaragua.webp"],
    ["+506", "Costa Rica", "costaRica.webp"],
    ["+507", "Panama", "panama.webp"],
    ["+508", "Saint-Pierre and Miquelon", "saintPierreMiquelon.webp"],
    ["+509", "Haiti", "haiti.webp"],
    ["+51", "Peru", "peru.webp"],
    ["+52", "Mexico", "mexico.webp"],
    ["+53", "Cuba", "cuba.webp"],
    ["+54", "Argentina", "argentina.webp"],
    ["+55", "Brazil", "brazil.webp"],
    ["+56", "Chile", "chile.webp"],
    ["+57", "Colombia", "colombia.webp"],
    ["+58", "Venezuela", "venezuela.webp"],
    ["+590", "Guadeloupe", "guadeloupe.webp"],
    ["+591", "Bolivia", "bolivia.webp"],
    ["+592", "Guyana", "guyana.webp"],
    ["+593", "Ecuador", "ecuador.webp"],
    ["+594", "French Guiana", "frenchGuiana.webp"],
    ["+595", "Paraguay", "paraguay.webp"],
    ["+596", "Martinique", "martinique.webp"],
    ["+597", "Suriname", "suriname.webp"],
    ["+598", "Uruguay", "uruguay.webp"],
    ["+599 3", "Sint Eustatius", "sintEustatius.png"],
    ["+599 4", "Saba", "saba.png"],
    ["+599 7", " Bonaire", "bonaire.png"],
    ["+599 9", "Curacao", "curacao.webp"],
    ["+60", "Malaysia", "malaysia.webp"],
    ["+61", "Australia", "australia.webp"],
    ["+61 8 9162", "Cocos Islands", "cocosIslands.webp"],
    ["+61 8 9164", "Christmas Island", "christmasIsland.webp"],
    ["+62", "Indonesia", "indonesia.webp"],
    ["+63", "Philippines", "philippines.webp"],
    ["+64", "New Zealand", "newZealand.webp"],
    ["+64", "Pitcairn Islands", "pitcairnIslands.webp"],
    ["+65", "Singapore", "singapore.webp"],
    ["+66", "Thailand", "thailand.webp"],
    ["+670", "East Timor", "eastTimor.webp"],
    ["+672", "AET", ""],
    ["+672 1", "AAT", "australianAntarcticTerritory.webp"],
    ["+672 3", "Norfolk Island", "norfolkIsland.webp"],
    ["+673", "Brunei", "brunei.webp"],
    ["+674", "Nauru", "nauru.webp"],
    ["+675", "Papua New Guinea", "papuaNewGuinea.webp"],
    ["+676", "Tonga", "tonga.webp"],
    ["+677", "Solomon Islands", "solomonIslands.webp"],
    ["+678", "Vanuatu", "vanuatu.webp"],
    ["+679", "Fiji", "fiji.webp"],
    ["+680", "Palau", "palau.webp"],
    ["+681", "Wallis and Futuna", "wallisFutuna.webp"],
    ["+682", "Cook Islands", "cookIslands.webp"],
    ["+683", "Niue", "niue.webp"],
    ["+685", "Samoa", "samoa.webp"],
    ["+686", "Kiribati", "kiribati.webp"],
    ["+687", "New Caledonia", "newCaledonia.webp"],
    ["+688", "Tuvalu", "tuvalu.webp"],
    ["+689", "French Polynesia", "frenchPolynesia.webp"],
    ["+690", "Tokelau", "tokelau.webp"],
    ["+691", "Federated States of Micronesia", "federatedStatesMicronesia.webp"],
    ["+692", "Marshall Islands", "marshallIslands.webp"],
    ["+7", "Russia", "russia.webp"],
    ["+7 6", "Kazakhstan", "kazakhstan.webp"],
    ["+7 7", "Kazakhstan", "kazakhstan.webp"],
    ["+7 840", "Abkhazia", "abkhazia.webp"],
    ["+7 940", "Abkhazia", "abkhazia.webp"],
    ["+800", "International Freephone (UIFN)", ""],
    ["+808", "Shared Cost Services", ""],
    ["+81", "Japan", "japan.webp"],
    ["+82", "South Korea", "southKorea.webp"],
    ["+84", "Vietnam", "vietnam.webp"],
    ["+850", "North Korea", "northKorea.webp"],
    ["+852", "Hong Kong", "hongKong.webp"],
    ["+853", "Macau", "macau.png"],
    ["+855", "Cambodia", "cambodia.webp"],
    ["+856", "Laos", "laos.webp"],
    ["+86", "China", "china.webp"],
    ["+870", "Inmarsat SNAC service", ""],
    ["+875", "Maritime Mobile service", ""],
    ["+876", "Maritime Mobile service", ""],
    ["+877", "Maritime Mobile service", ""],
    ["+878", "UPTS", ""],
    ["+879", "other services", ""],
    ["+880", "Bangladesh", "bangladesh.webp"],
    ["+881", "Global Mobile Satellite System", ""],
    ["+882", "International Networks", ""],
    ["+883", "International Networks", ""],
    ["+886", "Taiwan", "taiwan.webp"],
    ["+888", "TfDR by OCHA", ""],
    ["+90", "Turkey", ""],
    ["+90 392", "Northern Cyprus", ""],
    ["+91", "India", ""],
    ["+92", "Pakistan", ""],
    ["+92 582", "Azad Kashmir", ""],
    ["+92 581", "Gilgit Baltistan", ""],
    ["+93", "Afghanistan", ""],
    ["+94", "Sri Lanka", "sriLanka.webp"],
    ["+95", "Myanmar", "myanmar.webp"],
    ["+960", "Maldives", "maldives.webp"],
    ["+961", "Lebanon", "lebanon.webp"],
    ["+962", "Jordan", "jordan.webp"],
    ["+963", "Syria", "syria.webp"],
    ["+964", "Iraq", "iraq.webp"],
    ["+965", "Kuwait", "kuwait.webp"],
    ["+966", "Saudi Arabia", "saudiArabia.webp"],
    ["+967", "Yemen", "yemen.webp"],
    ["+968", "Oman", "oman.webp"],
    ["+970", "Palestine", "palestine.webp"],
    ["+971", "UAE", "unitedArabEmirates.webp"],
    ["+972", "Israel", "israel.webp"],
    ["+973", "Bahrain", "bahrain.webp"],
    ["+974", "Qatar", "qatar.webp"],
    ["+975", "Bhutan", "bhutan.webp"],
    ["+976", "Mongolia", "mongolia.webp"],
    ["+977", "Nepal", "nepal.webp"],
    ["+979", "IPRS", ""],
    ["+98", "Iran", "iran.webp"],
    ["+991", "ITPCS", ""],
    ["+992", "Tajikistan", "tajikistan.webp"],
    ["+993", "Turkmenistan", "turkmenistan.webp"],
    ["+994", "Azerbaijan", "azerbaijan.webp"],
    ["+995", "Georgia", "georgia.webp"],
    ["+995 34", "South Ossetia", "southOssetia.webp"],
    ["+995 44", "Abkhazia", "abkhazia.webp"],
    ["+996", "Kyrgyzstan", "kyrgyzstan.webp"],
    ["+997", "Kazakhstan", "kazakhstan.webp"],
    ["+998", "Uzbekistan", "uzbekistan.webp"],
  ];
</script>

<style scoped>
  body {
    margin: 0px;
    padding: 0px;
  }
  .wrapInputA {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 10px;
  }
  .titlePhoneInputA {
    font-size: 12px;
    color: #999;
    font-family: monospace;
  }
  .titleSelectInputA {
    font-size: 12px;
    color: #999;
    font-family: monospace;
  }
  .notType {
    width: 250px;
    padding: 0px;
    font-size: 12px;
    background-color: #ff8b8b;
    color: #fff;
    font-family: monospace;
  }
  .wrapPhoneInputA {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .wrapPhoneInputA {
    width: 175px;
    max-width: 175px;
    min-width: 175px;
    border-bottom: 2px solid #ffc359;
  }
  .wrapCountryCodePhoneInputA {
    flex: 1;
  }
  .countryCodePhoneInputA {
    cursor: pointer;
  }
  .countryCodePhoneInputA:hover {
    background-color: #ccc;
  }
  .numberPhoneInputA {
    width: 130px;
    max-width: 130px;
    min-width: 130px;
  }
  .countryCodePhoneInputA, .numberPhoneInputA {
    margin: 0px;
    padding: 10px;
    font-size: 14px;
    font-family: monospace;
    text-align: center;
    outline: none;
    border: none;
  }
  .numberPhoneInputA {
    padding-left: 0px;
  }
  .wrapSelectCountryCodePhoneInputA {
    margin-top: 4px;
    display: none;
    position: absolute;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    box-shadow: 0px 0px 5px #999;
    background-color: #fff;
    z-index: 10;
  }
  .wrapSearchSelectCountryCodePhoneInputA {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .logoSearchSelectCountryCodePhoneInputA {
    margin: 10px;
    margin-right: 0px;
    min-width: 20px;
    min-height: 20px;
    background-image: url(../assets/flags/loupe.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .searchSelectCountryCodePhoneInputA {
    outline: none;
    border: none;
    border-bottom: solid 2px #ccc;
    padding: 5px;
    margin: 10px;
    width: 100%;
  }
  .listSelectCountryCodePhoneInputA {
    margin: 10px;
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    max-height: 200px;
    overflow-y: auto;
  }
  .listSelectCountryCodePhoneInputA::-webkit-scrollbar {
    width: 5px;
    height: 0px;
  }
  .listSelectCountryCodePhoneInputA::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  .optionSelectCountryCodePhoneInputA {
    padding: 5px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-family: monospace;
    font-size: 12px;
    cursor: pointer;
  }
  .optionSelectCountryCodePhoneInputA:hover {
    background-color: #ccc;
  }
  .codeSelectCountryCodePhoneInputA {
    min-width: 60px;
    text-align: right;
  }
  .flagSelectCountryCodePhoneInputA {
    margin: 0px 10px;
    min-width: 23px;
    min-height: 15px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .nameSelectCountryCodePhoneInputA {
    max-width: 100px;
    text-align: left;
  }
  .titleTextInputA {
    margin-bottom: 0px;
    margin-left: 0px;
    margin-top: 0px;
    font-size: 12px;
    color: #999;
    z-index: 1;
    font-family: monospace;
    transition: all ease 0.2s;
    -webkit-transition: all ease 0.2s;
    -o-transition: all ease 0.2s;
    -moz-transition: all ease 0.2s;
  }
  .titleTextInputA[ontop="false"] {
    margin-top: 15px;
    margin-bottom: -25px;
    margin-left: 20px;
    transform: scale(1.2);
  }
  .inputTextInputV {
    margin: 0px;
    padding: 10px;
    font-size: 14px;
    font-family: monospace;
    text-align: left;
    outline: none;
    border: none;
    border-bottom: 2px solid #ffc359;
    z-index: 0;
  }
  .wrapDisplaySelectInputA {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .displaySelectInputA {
    padding: 10px;
    width: 170px;
    font-size: 14px;
    font-family: monospace;
    outline: none;
    border: none;
    border-bottom: 2px solid #ffc359;
  }
  .arrowDisplaySelectInputA {
    width: 10px;
    height: 10px;
    margin: 0px 10px;
    background-image: url("../assets/flags/arrow.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .listSelectInputA {
    width: 200px;
    position: absolute;
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
    box-shadow: 0px 0px 5px #999;
    max-height: 200px;
    overflow-y: auto;
  }
  .listSelectInputA::-webkit-scrollbar {
    width: 5px;
    height: 0px;
  }
  .listSelectInputA::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  .optionSelectInputA {
    padding: 5px 10px;
    font-size: 14px;
    font-family: monospace;
    cursor: pointer;
  }
  .optionSelectInputA:hover {
    background-color: #ccc;
  }
  .rowCheckboxInputV {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  }
  .icoCheckboxInputV {
    width: 20px;
    height: 20px;
    background-color: #000;
    margin-right: 10px;
    border-radius: 5px;
    background-color: #ccc;
    background-image: url(../assets/flags/ok.png);
    background-position: center;
    background-size: 0%;
    background-repeat: no-repeat;
    transition: all ease 0.2s;
    -webkit-transition: all ease 0.2s;
    -o-transition: all ease 0.2s;
    -moz-transition: all ease 0.2s;
  }
  .icoCheckboxInputV[active="true"] {
    background-color: #ffc359;
    background-size: 100%;
  }
  .titleCheckboxInputA {
    font-family: monospace;
    font-size: 14px;
  }
  .rowRadioInputV {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  }
  .icoRadioInputV {
    width: 20px;
    height: 20px;
    background-color: #000;
    margin-right: 10px;
    border-radius: 50px;
    background-color: #ccc;
    transition: all ease 0.2s;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: all ease 0.2s;
    -webkit-transition: all ease 0.2s;
    -o-transition: all ease 0.2s;
    -moz-transition: all ease 0.2s;
  }
  .icoRadioInputV[active="true"] {
    background-color: #ffc359;
  }
  .circleRadioInputV {
    width: 0px;
    height: 0px;
    background-color: #fff;
    border-radius: 50px;
    transition: all ease 0.2s;
    -webkit-transition: all ease 0.2s;
    -o-transition: all ease 0.2s;
    -moz-transition: all ease 0.2s;
  }
  .icoRadioInputV[active="true"] .circleRadioInputV {
    width: 10px;
    height: 10px;
    transition: all ease 0.2s;
    -webkit-transition: all ease 0.2s;
    -o-transition: all ease 0.2s;
    -moz-transition: all ease 0.2s;
  }
  .titleRadioInputA {
    font-family: monospace;
    font-size: 14px;
  }
</style>
