export class Functions {
    utils = {
        sp: (int) => {
            int = int.toString();
            if (int >= 10000) {
                return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
            } else {
                return int;
            }
        },
        ssp: (int) => { 
            int = int.toString();
            if (int >= 10000) {
                return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join(' ').split('').reverse().join('');
            } else {
                return int;
            }
        },
        decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
        rand: (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min }
    };

    getUnix() {
        return Math.floor(new Date().getTime());
    };

    unixStamp(stamp) {
        let date = new Date(stamp),
        year = date.getFullYear(),
        month = (date.getMonth() + 1).toString().padStart(2, "0"),
        day = date.getDate().toString().padStart(2, "0"),
        hour = date.getHours().toString().padStart(2, "0"),
        minutes = date.getMinutes().toString().padStart(2, "0"),
        secs = date.getSeconds().toString().padStart(2, "0");
    
        return { text: `${day}.${month}.${year}, ${hour}:${minutes}:${secs}`, y: year, m: month, d: day, h: hour, m: minutes, s: secs };
    };

    unixStampDays(stamp, stamp2) {
        let date1 = new Date(stamp);
        let date2 = new Date(stamp2);
    
        let years = date1.getFullYear() - date2.getFullYear();
        let lastAnniversary = new Date(date2);
        lastAnniversary.setFullYear(date2.getFullYear() + years);
        if (lastAnniversary > date1) {
            years--;
            lastAnniversary.setFullYear(date2.getFullYear() + years);
        }
        
        let remainderMs = date1 - lastAnniversary;
        
        let s = Math.floor(remainderMs / 1000) % 60;
        let m = Math.floor(remainderMs / (1000 * 60)) % 60;
        let h = Math.floor(remainderMs / (1000 * 60 * 60)) % 24;
        let d = Math.floor(remainderMs / (1000 * 60 * 60 * 24));
    
        let text = "";
        if (years > 0) {
            text += `${years} ${utils.decl(years, ["год", "года", "лет"])}, `;
        }
        if (d > 0) {
            text += `${d} ${utils.decl(d, ["день", "дня", "дней"])}, `;
        }
        if (h > 0) {
            text += `${h} ${utils.decl(h, ["час", "часа", "часов"])}, `;
        }
        if (m > 0) {
            text += `${m} ${utils.decl(m, ["минуту", "минуты", "минут"])}, `;
        }
        text += `${s} ${utils.decl(s, ["секунду", "секунды", "секунд"])}`;
    
        return { seconds: s, minutes: m, hours: h, days: d, years: years, text: text };
    };

    async getData(url) {
        const response = await fetch(url);

        if (response.ok && response.status == 200) {
            const data = await response.json();
            return data ? data : response;
        };
    };

    async createMap() {
        const map = new Map();
        const data = await this.getData("https://dummyjson.com/users");
        if (data) {
            data.users.forEach((el) => {
                if (!map.has(el.id)) {
                    map.set(el.id, `${el.firstName.toUpperCase()} ${el.lastName.toUpperCase()}`)
                }
            });

            return map;
        };
    };

    async addNFTs(set, counts) {
        const response = await this.getData("./data/data.json");
        const container = document.querySelector(".items");
        if (container) {
            container.innerHTML = "";
            await response.forEach(el => {
                const newItem = document.createElement("div");
                const itemImg = document.createElement("div");
                const nftName = document.createElement("p");
                const nftOwner = document.createElement("p");
                const nftCost = document.createElement("p");
                const nftAvatar = document.createElement("img");
                newItem.classList.add("item");
                itemImg.classList.add("item_img");
                nftName.textContent = el.nftName;
                nftName.classList.add("nftName");
                nftOwner.classList.add("nftOwner");
                nftOwner.textContent = el.nftOwner;
                nftAvatar.src = el.nftOwnerAvatar;
                nftAvatar.alt = "avatar";
                nftAvatar.loading = "lazy";
                nftCost.innerHTML = `${el.nftCost} ETH<br><b>BUY</b>`;
                nftCost.classList.add("nftCost");
                itemImg.style.backgroundImage = `url(${el.img})`;
                newItem.appendChild(itemImg);
                newItem.appendChild(nftName);
                newItem.appendChild(nftOwner);
                newItem.appendChild(nftAvatar);
                newItem.appendChild(nftCost);

                container.appendChild(newItem);

                newItem.addEventListener("click", async () => {
                    counts[el.nftID] = (counts[el.nftID] || 0) + 1;
                    set.add(el.nftID);

                    await this.addToCart(counts);
                });
            });
        }
    }

    async getNFT(id) {
        const response = await this.getData("./data/data.json");
        const found = response.find((element) => element.nftID == id);
        return found;
    }

    async addToCart(counts) {
        const cartMenu = document.querySelector(".cart_menu");
        if (cartMenu) {
            for (let [key] in counts) {
                // Key: ${key}, value: ${counts[key]}
                const nft = await this.getNFT(key);
                if (nft) {
                    const container = document.querySelector(".cartItems_container");
                    if (container) {
                        const containedItem = document.querySelector(`.cartItem.nft_${key}`);
                        if (!containedItem) {
                                const newItem = document.createElement("div");
                                const counter = document.createElement("div");
                                counter.classList.add("counter");
                                const counterCount = document.createElement("span");
                                const firstImg = document.createElement("img");
                                const secondImg = document.createElement("img");
                                const nftTitle = document.createElement("p");
                                const nftOwner = document.createElement("p");
                                firstImg.src = nft.img;
                                firstImg.alt = "NFT_image";
                                firstImg.loading = "lazy";
                                secondImg.src = nft.nftOwnerAvatar;
                                secondImg.alt = "NFT_owner";
                                secondImg.loading = "lazy";
                                newItem.classList.add("cartItem");
                                newItem.classList.add(`nft_${nft.nftID}`);
                                counterCount.textContent = counts[key];
                                nftTitle.textContent = nft.nftName;
                                nftOwner.textContent = nft.nftOwner;
                                counter.appendChild(counterCount);
                                newItem.appendChild(counter);
                                newItem.appendChild(firstImg);
                                newItem.appendChild(nftTitle);
                                newItem.appendChild(nftOwner);
                                newItem.appendChild(secondImg);
                                container.appendChild(newItem);
                        } else {
                            console.log(containedItem.children[0]);
                            containedItem.children[0].children[0].textContent = `${counts[key]}`;
                            console.log(containedItem.children[0]);
                        }
                    }
                }
            }
        }
    }
}