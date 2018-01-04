Serves up the current contents of a dropbox to populate sections of a CiE toolkit website. A similiar [api script](https://github.com/AmericanRedCross/sims-website-api) is used for the [SIMS website](https://github.com/AmericanRedCross/sims-website).

__Some guidance on setup:__
- I use an Ubuntu server running on Amazon Web Services EC2
- I suggest [installing](https://github.com/creationix/nvm#install-script) `nvm` to manage node versions, especially if you may be running different apps on the same server
- Clone the repo and install dependencies
```
cd ~
git clone https://github.com/AmericanRedCross/ctp-website-api.git
cd ctp-website-api
nvm install 6.10.3
nvm use
npm install
```
- Install [Dropbox](https://www.dropbox.com/install-linux) for Linux
```
uname -m

# should show 
# > `x86_64`

cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64" | tar xzf -
mkdir ~/utils
wget -O ~/utils/dropbox.py "http://www.dropbox.com/download?dl=packages/dropbox.py"
chmod 755 ~/utils/dropbox.py
wget -O ~/utils/dropbox_temp "https://gist.githubusercontent.com/brandonb927/a0b33ecbe6fa8337b0b4/raw/ebf643c1dbcaf0d5f4a353e6621f315485438f36/dropbox"

# above line downloads this https://gist.github.com/brandonb927/a0b33ecbe6fa8337b0b4

~/.dropbox-dist/dropboxd

# should give a message like this:
# > `This computer isn't linked to any Dropbox account...`    
# > `Please visit {{link}} to link this device.`
# after visiting the link and following the instructions should see:
# > `This computer is now linked to Dropbox. Welcome {{name}}`
# kill the daemon with a `Ctrl`+`C`

sudo vim ~/utils/dropbox_temp

# edit the script and replace "username" with your server username not your Dropbox account

sudo mv ~/utils/dropbox_temp /etc/init.d/dropbox
sudo chmod +x /etc/init.d/dropbox
sudo update-rc.d dropbox defaults

# should show messages something like:
# > `update-rc.d: warning: /etc/init.d/dropbox missing LSB information`   
# > `update-rc.d: see <http://wiki.debian.org/LSBInitScripts>`   
# > `Adding system startup for /etc/init.d/dropbox ...`   
# > `/etc/rc0.d/K20dropbox -> ../init.d/dropbox`   
# > `/etc/rc1.d/K20dropbox -> ../init.d/dropbox`   
# > `/etc/rc6.d/K20dropbox -> ../init.d/dropbox`   
# > `/etc/rc2.d/S20dropbox -> ../init.d/dropbox`   
# > `/etc/rc3.d/S20dropbox -> ../init.d/dropbox`   
# > `/etc/rc4.d/S20dropbox -> ../init.d/dropbox`   
# > `/etc/rc5.d/S20dropbox -> ../init.d/dropbox`  

sudo service dropbox status

# if not running, start it with 

sudo service dropbox start

~/utils/dropbox.py status
cd ~/Dropbox
~/utils/dropbox.py ls 

# should list all your dropbox folders
# you can exclude ones you don't want to sync with the following

~/utils/dropbox.py exclude add Photos
~/utils/dropbox.py exclude add Public
```
- Install Nginx
```
sudo apt-get install nginx

# looked at 
# https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts

sudo vim /etc/nginx/sites-available/webviz

# see example nginx settings in `nginx.example` file

sudo ln -s /etc/nginx/sites-available/webviz /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo vim /etc/nginx/nginx.conf

# uncomment "server_names_hash_bucket_size 64;"
# https://gist.github.com/muhammadghazali/6c2b8c80d5528e3118613746e0041263

sudo service nginx restart
```
- Use [PM2](https://github.com/Unitech/pm2) to keep the api script running even after you logout from the server
```
cd ~ 
nvm use default
npm install -g pm2
cd ctp-website-api
pm2 start app.js --name="ctp_3000" --interpreter=/home/ubuntu/.nvm/versions/node/v6.10.3/bin/node
pm2 startup # run once to generate startup script
pm2 save
```
