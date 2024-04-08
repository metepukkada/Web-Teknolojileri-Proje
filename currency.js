fetch('https://cors-anywhere.herokuapp.com/https://www.tcmb.gov.tr/kurlar/today.xml')
            .then(response => response.text())
            .then(data => {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data, 'application/xml');
                var currencyList = xmlDoc.getElementsByTagName('Currency');
                var dovizListesiDiv = document.getElementById('doviz-listesi');

                var html = '';
                for (var i = 0; i < currencyList.length; i++) {
                    var kod = currencyList[i].getAttribute('Kod');
                    var forexAlis = currencyList[i].getElementsByTagName('ForexBuying')[0].textContent;
                    var forexSatis = currencyList[i].getElementsByTagName('ForexSelling')[0].textContent;

                    html += '<li>' + kod + ': ' + ' (Alış: ' + forexAlis + ', Satış: ' + forexSatis + ')</li>';
                }
                html += '</ul>';
                
                dovizListesiDiv.innerHTML = html;
            })
            .catch(error => {
                console.error('Hata:', error);
            });