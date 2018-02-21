Serves up the current contents of a dropbox to populate sections of an ENA toolkit website. Similar api scripts are used for the Cash in Emergencies Website ([api](https://github.com/AmericanRedCross/ctp-website-api), [website](https://github.com/AmericanRedCross/ctp-website)) and SIMS website ([api](https://github.com/AmericanRedCross/sims-website-api), [website](https://github.com/AmericanRedCross/sims-website)).

__Some guidance on setup:__
- I use an Ubuntu server running on Amazon Web Services EC2
  - Ubuntu 16.04; t2.micro; 30GB root volume; security rules for `SSH` and `HTTP`; assigned an Elastic IP after launching
- when connecting, if using a pem key, the first time you'll probably need to first run `chmod 400 my-key.pem`
- I suggest [installing](https://github.com/creationix/nvm#install-script) `nvm` to manage node versions, especially if you may be running different apps on the same server
- Clone the repo and install dependencies
```
cd ~
git clone https://github.com/AmericanRedCross/ena-website-api.git
cd ena-website-api
nvm install 8.9.4
nvm use
npm install
```
- Install [Dropbox](https://www.dropbox.com/install-linux) for Linux
- Used this [article](http://www.dropboxwiki.com/tips-and-tricks/install-dropbox-in-an-entirely-text-based-linux-environment) to inform the following
```

sudo apt install python
#  Ubuntu 16.04 comes by default with Python 3.5.1 installed as the python3 binary. Python 2 is still installable using the python package.

uname -m

# should show 
# > `x86_64`

cd
wget -O dropbox.tar.gz "http://www.dropbox.com/download/?plat=lnx.x86_64"
tar -tzf dropbox.tar.gz
tar -xvzf dropbox.tar.gz

# Make sure the LANG environment variable 
# is set to something other than NULL, 
# e.g. en_US.iso88591. If it is NULL, 
# you’ll get a cryptic error.
echo $LANG

# run dropboxd
~/.dropbox-dist/dropboxd

# should give a message like this:
# > `This computer isn't linked to any Dropbox account...`    
# > `Please visit {{link}} to link this device.`

# after visiting the link and following the instructions should see:
# > `This computer is now linked to Dropbox. Welcome {{name}}`
# kill the daemon with a `Ctrl`+`C`

crontab -e
# add the following line
@reboot $HOME/.dropbox-dist/dropboxd
# save and close the file

mkdir -p ~/bin  
wget -O ~/bin/dropbox.py "http://www.dropbox.com/download?dl=packages/dropbox.py"  
chmod 755 ~/bin/dropbox.py  
~/bin/dropbox.py help
~/bin/dropbox.py status
cd ~/Dropbox # this command is important

~/bin/dropbox.py ls 

# should list all your dropbox folders
# you can exclude ones you don't want to sync with the following

~/bin/dropbox.py exclude add Photos
~/bin/dropbox.py exclude add Public
# etc...

# reboot your server
# check that dropbox is running
~/bin/dropbox.py status
```
- Install Nginx
```
sudo apt-get install nginx

# looked at 
# https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts

sudo vim /etc/nginx/sites-available/custom

# see example nginx settings in `nginx.example` file

sudo ln -s /etc/nginx/sites-available/custom /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo vim /etc/nginx/nginx.conf

# uncomment "server_names_hash_bucket_size 64;"
# https://gist.github.com/muhammadghazali/6c2b8c80d5528e3118613746e0041263

sudo service nginx restart
```
- Use [PM2](https://github.com/Unitech/pm2) to keep the api script running even after you logout from the server
```
cd ~ 
npm install -g pm2
cd ena-website-api
pm2 start app.js --name="ena_3000" --interpreter=/home/ubuntu/.nvm/versions/node/v8.9.4/bin/node
pm2 startup # run once to generate startup script
# need to copy/paste/run the command it gives you
pm2 save
```
