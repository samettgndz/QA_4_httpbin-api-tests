# Cypress API Test Automation

Bu projede, public bir API kullanılarak Cypress ile otomatik HTTP API testleri gerçekleştirilmiştir.  
Amaç, backend servislerinin doğru, kararlı ve beklenen şekilde çalıştığını otomasyon ile doğrulamaktır.

## Kullanılan API
- **HTTPBin Public API**
- Test amaçlı geliştirilmiş, HTTP isteklerini ve yanıtlarını yansıtan (echo) bir servistir.

## Kullanılan Teknolojiler
- Cypress
- JavaScript
- HTTP / REST API

## Test Kapsamı
Bu projede aşağıdaki senaryolar otomatik olarak test edilmiştir:
- GET, POST, PUT ve DELETE HTTP istekleri
- Query parametrelerinin gönderilmesi ve doğrulanması
- Standart ve özel header kullanımı (User-Agent dahil)
- JSON formatında request body gönderimi
- Response body doğrulaması
- HTTP status code kontrolü
- API yanıt süresi (response time) ölçümü

Toplamda **10 adet otomatik API testi** bulunmaktadır.

## Testleri Çalıştırma
Projeyi klonladıktan sonra aşağıdaki adımlar izlenebilir:

```bash
npm install
npx cypress open
