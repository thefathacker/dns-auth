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
var STUB_PRD_AD = [
			NS('prd', 'dc-apv-1.prd.thefathacker.tech.'),
			NS('prd', 'dc-apv-2.prd.thefathacker.tech.'),
			A('dc-apv-1.prd', '10.41.32.3'),
			AAAA('dc-apv-1.prd', '2001:44b8:2148:2920::3'),
			A('dc-apv-2.prd', '10.41.33.3'),
			AAAA('dc-apv-2.prd', '2001:44b8:2148:2921::3')
		];

// FORWARD DOMAINS
D('thefathacker.tech', REG_NONE, DnsProvider(DNS_BIND), NSSERVERS, SPF, O365, STUB_PRD_AD,
			A('ns-apv-1', '10.41.32.2'),
			AAAA('ns-apv-1', '2001:44b8:2148:2910::2'),
			A('ns-apv-2', '10.41.33.2'),
			AAAA('ns-apv-2', '2001:44b8:2148:2911::2'),
			A('resolv-apv-1', '10.41.32.1'),
			AAAA('resolv-apv-1', '2001:44b8:2148:2910::1'),
			A('resolv-apv-2', '10.41.33.1'),
			AAAA('resolv-apv-2', '2001:44b8:2148:2911::1')
		);
// REVERSE DOMAINS
//Alpha - Production - Network - Hardware
D(REV('10.41.16.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('10.41.16.254', 'rb3011-app-1.thefathacker.tech.')
		);
D(REV('2001:44b8:2148:2910::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('2001:44b8:2148:2910::fe', 'rb3011-app-1.thefathacker.tech.')
		);
//Alpha - Production - Hypervisor - Hardware
D(REV('10.41.17.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('10.41.17.254', 'rb3011-app-1.thefathacker.tech.')
		);
D(REV('2001:44b8:2148:2911::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('2001:44b8:2148:2911::fe', 'rb3011-app-1.thefathacker.tech.')
		);
//Alpha - Production - NetOps - Primary
D(REV('10.41.32.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('10.41.32.254', 'rb3011-app-1.thefathacker.tech.')
		);
D(REV('2001:44b8:2148:2920::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('2001:44b8:2148:2920::fe', 'rb3011-app-1.thefathacker.tech.')
		);
//Alpha - Production - NetOps - Secondary
D(REV('10.41.33.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('10.41.33.254', 'rb3011-app-1.thefathacker.tech.')
		);
D(REV('2001:44b8:2148:2921::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('2001:44b8:2148:2921::fe', 'rb3011-app-1.thefathacker.tech.')
		);
