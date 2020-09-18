// Providers

var REG_NONE = NewRegistrar('none', 'NONE'); // NO/UNSUPPORTED Registrars
var DNS_BIND = NewDnsProvider('bind', 'BIND', { //INTERNAL BIND9 DNS
				'default_soa': {
								'master':	   'ns-apv-1.thefathacker.tech.',
								'mbox':		 'thefathacker.thefathacker.tech.',
								'refresh':	  600,
								'retry':		60,
								'expire':	   3600,
								'minttl':	   30
						}
				});
// COMMON
var NSSERVERS = [
				NAMESERVER('ns-apv-1.thefathacker.tech.'),
				NAMESERVER('ns-apv-2.thefathacker.tech.')
		];
var SPF = SPF_BUILDER({
				label: "@",
				overflow: "_spf%d",
				raw: "_rawspf",
				parts: [
						"v=spf1",
						"ip4:150.101.178.95",
						"ip4:150.101.181.224/29",
						"ip6:2001:44b8:2148:2900::/56",
						"include:spf.protection.outlook.com",
						"include:_spf.google.com",
						"~all"],
				flatten: []
		});
var O365 = [
				CNAME("autodiscover", "autodiscover.outlook.com."),
				CNAME("sip", "sipdir.online.lync.com."),
				CNAME("lyncdiscover", "webdir.online.lync.com."),
				CNAME("enterpriseregistration","enterpriseregistration.windows.net."),
				CNAME("enterpriseenrollment","enterpriseenrollment.manage.windows.net."),
				SRV("_sip._tls", 10, 1, 443, "sipdir.online.lync.com."),
				SRV("_sipfederationtls._tcp", 10, 1, 5061, "sipfed.online.lync.com."),
				MX("@", 0, "thefathacker-tech.mail.protection.outlook.com."),
				SPF
		];



// DOMAINS
D('thefathacker.tech', REG_NONE, DnsProvider(DNS_BIND), NSSERVERS
		);
D(REV('172.31.16.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS
		);
D(REV('fdff:6861:7873:1f10::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS
		);