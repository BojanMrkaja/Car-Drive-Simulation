
        let fuelInterval;
        let fuelGas = 100;
        let position = 0;
        let speed = 1;
        let stop;
        let isBought = false;

        let car = {
            'brand': 'img/mercedes.png',
            'fuel': 'disel',
            'color': 'white',
            'potrosnja': 7,
            'brojVrata': 5,
            'upaliAuto': () => {
                if(isBought){
                    document.getElementById('light1').className = 'light yellow';
                    document.getElementById('light2').className = 'light yellow';
                    fuelInterval = setInterval( () => {
                    car.emptyTank();
                }, 1000);
                }
            },
            'emptyTank':  () => {
                if (fuelGas > 0) {
                    fuelGas = fuelGas - this.potrosnja / 10;
                    document.getElementById('currentFuelState').style.width = fuelGas + '%';
                } else {
                    clearInterval(fuelInterval);
                    clearInterval(stop);
                    this.ugasiAuto();
                    tankFuels();
                }
            },
            'ugasiAuto': () => {
                document.getElementById('light1').className = ('');
                document.getElementById('light2').className = ('');
                clearInterval(fuelInterval);
                clearInterval(stop);
               
            },
            'move':() => {
               if(isBought){
                stop = setInterval(moveCar, 200);
               }
            },
            'stopCar': () => {
                clearInterval(stop);
            },
            'pretekni':() => {
                if(isBought){
                    document.getElementById('light1').className = 'light yellow migavac';
                    document.getElementById('light2').className = 'light yellow';
                    setTimeout(() => {
                    document.getElementById('car').style.bottom = '120px';
                },1000)
                }
             
            },
            'vartiSeTraku':() => {
                if(isBought){
                    document.getElementById('light1').className = 'light yellow';
                    document.getElementById('light2').className = 'light yellow migavac';
                    setTimeout(() => {
                    document.getElementById('car').style.bottom = '20px';
                },1000)
                }
            },
            'promeniBrzinu':() => {
                if(speed < 5){
                    speed ++;
                }
            },
            'reverse':() => {
                speed = -1;
            }

        };

        document.getElementById('izaberiAuto').addEventListener('click',() => {
            let error = 0;
            let brand = document.getElementById('car-store').value;
            let brandError = '';
            let potrsnjaError = '';
            let colorError = '';
            let doorNumberError = '';

            if (brand.length == 0) {
                error++;
                brandError += 'Molim izaberite model auta';
                document.getElementById('car-error').innerText = brandError;
            } else {
                document.getElementById('car-error').innerText = '';
            }

            let potrosnja = document.getElementById('potrosnja').value;
            potrosnja = potrosnja.trim();

            if (potrosnja.length == 0 || (isNaN(potrosnja))) {
                error++;
                potrsnjaError += 'Molim unesite iznos potrosnje u brojevima';
                document.getElementById('potrosnja-error').innerText = potrsnjaError;
            } else {
                document.getElementById('potrosnja-error').innerText = '';
            }

            potrosnja = parseInt(potrosnja);

            let color = document.getElementById('color').value;
            color = color.trim();

            if (color.length === 0) {
                error++;
                colorError += 'Molim unesite zeljenu boju';
                document.getElementById('color-error').innerText = colorError;
            } else {
                document.getElementById('color-error').innerText = '';
            }

            let doors = document.getElementById('doorNumber').value;
            doors = doors.trim();

            if (doors.length === 0 || (isNaN(doors))) {
                error++;
                doorNumberError += 'Molim unesite broj vrata';
                document.getElementById('door-error').innerText = doorNumberError;
            } else {
                document.getElementById('door-error').innerText = '';
            }

            doors = parseInt(doors);

            if (error === 0) {
                car.brand = brand;
                car.potrosnja = potrosnja;
                car.color = color;
                car.brojVrata = doors;
                document.getElementById('car-store').value = '';
                document.getElementById('potrosnja').value = '';
                document.getElementById('color').value = '';
                document.getElementById('doorNumber').value = '';
            }
        });

        document.getElementById('buyCar').addEventListener('click',() => {
            document.getElementById('car').style.backgroundImage = `url("${car.brand}")`;
            document.getElementById('fuelBar').style.display = 'block';
            isBought = true;
        });

        document.getElementById('startCar').addEventListener('click', car.upaliAuto);
        document.querySelector('#stopCar').addEventListener('click', car.ugasiAuto);

         function moveCar(){
            document.getElementById('car').style.left = position + '%';
            position = position + speed;
        };

        document.querySelector('#go').addEventListener('click', car.move);
        document.querySelector('#stopMove').addEventListener('click', car.stopCar);


        document.getElementById('pretekni').addEventListener('click', car.pretekni);
        document.getElementById('vsust').addEventListener('click', car.vartiSeTraku);
        document.getElementById('promeniBrzinu').addEventListener('click', car.promeniBrzinu);
        document.getElementById('rikverc').addEventListener('click', car.reverse);

        function tankFuels(){
            if(isBought){
                let refill = prompt('Dopuni gorivo');
            if(isNaN(refill) || refill < 1){
              alert('molimo unesite koliko zelite da dopunite goriva');
              refill = prompt('Dopuni gorivo');
            }
            refill = parseInt(refill);
            if(refill < fuelGas){
                alert('Vas auto ima dovoljno goriva');
                return;
            }
            if(refill > 0 && refill < 101){
                fuelGas = refill;
                document.getElementById('currentFuelState').style.width = fuelGas + '%';
            }else{
                fuelGas = 100;
                document.getElementById('currentFuelState').style.width = fuelGas + '%';
            }
            } 
        }

        document.getElementById('dopuniGorivo').addEventListener('click', tankFuels);

 