// Providers
var	REG_NONE = NewRegistrar('none', 'NONE');	// NO/UNSUPPORTED Registrars
var DNS_BIND = NewDnsProvider('bind', 'BIND', {	//INTERNAL BIND9 DNS
	'default_soa':	{
		'master':	'ns-apv-1.thefathacker.tech.',
		'mbox':		'thefathacker.thefathacker.tech.',
		'refresh':	600,
		'retry':	60,
		'expire':	3600,
		'minttl':	30	}});
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
				MX("@", 0, "thefathacker-tech.mail.protection.outlook.com.")
		];
// STUB LOOKUPS
var STUB_PRD = [
			NS('prd', 'dc-apv-1.prd.thefathacker.tech.'),
			NS('prd', 'dc-apv-2.prd.thefathacker.tech.'),
			A('dc-apv-1.prd', '172.31.16.3'),
			A('dc-apv-2.prd', '172.31.17.3'),
			AAAA('dc-apv-1.prd', 'fdff:6861:7873:1f10::3'),
			AAAA('dc-apv-2.prd', 'fdff:6861:7873:1f11::3')
		];

// FORWARD DOMAINS
D('thefathacker.tech', REG_NONE, DnsProvider(DNS_BIND), NSSERVERS, SPF, O365, STUB_PRD,
			A('ns-apv-1', '172.31.16.2'),
			A('ns-apv-2', '172.31.17.2'),
			A('psql-apv-1', '172.31.32.1'),
			A('netbox-apv-1', '172.31.33.1'),
			A('nas-apv-1', '172.31.33.2'),
			A('resolv-apv-1', '172.31.16.1'),
			A('resolv-apv-2', '172.31.17.1'),
			AAAA('ns-apv-1', 'fdff:6861:7873:1f10::2'),
			AAAA('ns-apv-2', 'fdff:6861:7873:1f11::2'),
			AAAA('psql-apv-1', 'fdff:6861:7873:1f20::1'),
			AAAA('netbox-apv-1', 'fdff:6861:7873:1f21::1'),
			AAAA('nas-apv-1', 'fdff:6861:7873:1f21::2'),
			AAAA('resolv-apv-1', 'fdff:6861:7873:1f10::1'),
			AAAA('resolv-apv-2', 'fdff:6861:7873:1f11::1')
		);
// REVERSE DOMAINS
//Alpha - Production - Network Operations - Primary
D(REV('172.31.16.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('172.31.16.1', 'resolv-apv-1.thefathacker.tech.'),
			PTR('172.31.16.2', 'ns-apv-1.thefathacker.tech.'),
			PTR('172.31.16.3', 'dc-apv-1.thefathacker.tech.'),
			PTR('172.31.16.254', 'rb3011-app-1.thefathacker.tech.')
		);
D(REV('fdff:6861:7873:1f10::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('fdff:6861:7873:1f10::1', 'resolv-apv-1.thefathacker.tech.'),
			PTR('fdff:6861:7873:1f10::2', 'ns-apv-1.thefathacker.tech.'),
			PTR('fdff:6861:7873:1f10::3', 'dc-apv-1.thefathacker.tech.'),
			PTR('fdff:6861:7873:1f10::fe', 'rb3011-app-1.thefathacker.tech.')
		);
//Alpha - Production - Network Operations - Secondary
D(REV('172.31.17.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('172.31.17.1', 'resolv-apv-2.thefathacker.tech.'),
			PTR('172.31.17.2', 'ns-apv-2.thefathacker.tech.'),
			PTR('172.31.17.3', 'dc-apv-2.thefathacker.tech.'),
			PTR('172.31.17.254', 'rb3011-app-1.thefathacker.tech.')
		);
D(REV('fdff:6861:7873:1f11::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('fdff:6861:7873:1f11::1', 'resolv-apv-2.thefathacker.tech.'),
			PTR('fdff:6861:7873:1f11::2', 'ns-apv-2.thefathacker.tech.'),
			PTR('fdff:6861:7873:1f11::3', 'dc-apv-2.thefathacker.tech.'),
			PTR('fdff:6861:7873:1f11::fe', 'rb3011-app-1.thefathacker.tech.')
		);
//Alpha - Production - Database Virtual Machines
D(REV('172.31.32.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('172.31.32.1', 'psql-apv-1.thefathacker.tech.'),
			PTR('172.31.32.254', 'rb3011-app-1.thefathacker.tech.')
		);
D(REV('fdff:6861:7873:1f20::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('fdff:6861:7873:1f20::1', 'psql-apv-1.thefathacker.tech.'),
			PTR('fdff:6861:7873:1f20::fe', 'rb3011-app-1.thefathacker.tech.')
		);
//Alpha - Production - Application Virtual Machines
D(REV('172.31.33.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('172.31.33.1', 'netbox-apv-1.thefathacker.tech.'),
			PTR('172.31.33.2', 'nas-apv-1.thefathacker.tech.'),
			PTR('172.31.33.254', 'rb3011-app-1.thefathacker.tech.')
		);
D(REV('fdff:6861:7873:1f21::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('fdff:6861:7873:1f21::1', 'netbox-apv-1.thefathacker.tech.'),
			PTR('fdff:6861:7873:1f21::2', 'nas-apv-1.thefathacker.tech.'),
			PTR('fdff:6861:7873:1f21::fe', 'rb3011-app-1.thefathacker.tech.')
		);
