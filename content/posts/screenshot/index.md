---
title: "My eJPT Notes – Full Preparation Guide"
description: "Complete eJPT hands-on notes including labs, tips and practical attack steps."
keywords: ["eJPT notes", "pentesting", "ethical hacking", "cybersecurity tutorials"]
tags: ["eJPT", "pentesting"]
date: 2025-01-02
image: "cover.jpeg"  
---

# image with screenshot
![Sample Image](1.png "placeholder text")
![Sample Image](cover.jpeg "placeholder text")
![Sample Image](/images/01.avif "Sample Image")


**Pivoting** is the technique of using a compromised host to access other systems on an internal network that are not directl



#### 1. Autoroute
Used in Meterpreter to add a route to an internal subnet through the compromised session.
- **Command:**
    - `run autoroute -s <ip/subnet>` 
      (Example from note: `run autoroute -s 10.10.10.0/24`)
- **Scanning via Route:**
    - Once the route is added, you can use Metasploit scanner modules (like `auxiliary/scanner/portscan/tcp`) 
      and set the `RHOSTS` to the internal target (e.g., `10.10.10.3`).

#### 2. Port Forwarding
Used in Meterpreter to forward a port from the attacker's machine to a target on the internal network (or vice-versa).
- **Command:**
    - `portfwd add -l <local_port> -p <remote_port> -r <remote_host_ip>`
- **Example (Forwarding to internal target):**
    - `portfwd add -l 123 -p 80 -r 10.10.10.3`
    - This forwards your (attacker's) local port 123 to port 80 on the internal target `10.10.10.3`.
      You can then scan your own `localhost:123` to scan the target's port 80.
      
---
##### Ping sweep (fast, parallel)
- **What:** Sends a single ICMP echo to many hosts in parallel and prints responsive hosts. Fast but depends on ICMP being allowed on the network.    
- **Bash (Linux/macOS with bash):**          `for i in {1..255}; do (ping -c 1 192.168.1.$i | grep "bytes from" &); done`
- **PowerShell (Windows):**                        `1..255 | ForEach-Object { if (Test-Connection -Count 1 -Quiet "192.168.1.$_") { "192.168.1.$_ is up" } }`
- **Notes:** ICMP can be blocked by firewalls; a lack of response doesn’t always mean host is down.
##### Simple TCP port scan (Bash one-liner)
- **What:** Tries to open a TCP connection to each port and prints ports that accept the connection. Works only for TCP and requires bash feature `/dev/tcp`. Slow for many ports; use Nmap for efficiency and accuracy.
- **Bash (Linux/macOS with bash):**        `for p in {1..65535}; do (echo > /dev/tcp/192.168.1.1/$p) >/dev/null 2>&1 && echo "$p is open"; done`
- **PowerShell (Short TCP check (ports 1–1024 eg):**     
  `1..1024 | ForEach-Object {   $s = New-Object System.Net.Sockets.TcpClient   try { $s.Connect("192.168.1.1", $_); "$_ open"; $s.Close() } catch {} }`
- **Notes:** These simple checks don’t do service detection, banner grabbing, or handle timeouts elegantly.
----
- https://medium.com/@abhimistry06/pivot-like-a-pro-a-complete-guide-to-offensive-security-pivoting-techniques-c3f1974aaf83

```bash
┌──(navnee1h㉿kali)-[~]
└─$ whoami                      
navnee1h
                                                                                
┌──(navnee1h㉿kali)-[~]
└─$ ls
Desktop    file      Public               snap       Videos
Documents  Music     render-image-backup  Softwares  virtual_1.pdf
Downloads  Pictures  reports              Templates  模板
                                                                                
┌──(navnee1h㉿kali)-[~]
└─$ 


```