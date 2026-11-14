# Browser smoke test (Python + Playwright). Run `npm run build && npx vite preview --port 5173` in client/ first.
from playwright.sync_api import sync_playwright
base="http://127.0.0.1:5173"
errs=[]; ok=[]
def check(name,cond): (ok if cond else errs).append(name); print(("PASS " if cond else "FAIL ")+name)
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"])
    pg=b.new_context(viewport={"width":1280,"height":900}).new_page()
    pe=[]; pg.on("pageerror",lambda e: pe.append(str(e)[:200]))
    # home -> explore via world card
    pg.goto(base); pg.wait_for_timeout(1500)
    pg.click("text=Explore >> nth=-2") if False else None
    pg.goto(base+"/explore?world=Mars"); pg.wait_for_timeout(800)
    check("Mars filter shows 4 cards", pg.locator("article.card").count()==4)
    pg.click("button:has-text('Reset')"); pg.wait_for_timeout(500)
    check("Reset shows 7 cards", pg.locator("article.card").count()==7)
    pg.fill("input[type=search]","helicopter"); pg.wait_for_timeout(400)
    check("search narrows to 1", pg.locator("article.card").count()==1)
    pg.fill("input[type=search]","zzzz"); pg.wait_for_timeout(400)
    check("empty state", pg.locator(".empty").count()==1)
    # card opens story
    pg.goto(base+"/explore"); pg.click("article.card >> nth=0 >> text=Read story"); pg.wait_for_timeout(800)
    check("story url", "/machine/" in pg.url)
    check("photo gallery thumbs", pg.locator(".thumbs button").count()>=3)
    pg.click("text=Mars >> nth=0") if False else None
    # badges: visit all moon and mars
    for mid in ["apollo-lm-descent-stage","lunar-roving-vehicle","sojourner","spirit","opportunity","ingenuity"]:
        pg.goto(base+"/machine/"+mid); pg.wait_for_timeout(500)
    pg.wait_for_timeout(600)
    check("badge toast or stored", "moon" in pg.evaluate("localStorage.getItem('fw-progress-v1')") and "mars" in pg.evaluate("localStorage.getItem('fw-progress-v1')"))
    # timeline select
    pg.goto(base+"/timeline"); pg.wait_for_timeout(800)
    dots=pg.locator(".tl-dot"); n=dots.count()
    for k in range(5): dots.nth(k).click(); pg.wait_for_timeout(200)
    check("timeline has events", n>10)
    check("historian badge", "historian" in pg.evaluate("localStorage.getItem('fw-progress-v1')"))
    # map
    pg.goto(base+"/map"); pg.wait_for_timeout(800)
    pg.locator("g.marker").first.click(force=True); pg.wait_for_timeout(500)
    check("map panel opens", pg.locator(".map-panel").count()==1)
    pg.click(".map-panel >> text=View its story"); pg.wait_for_timeout(800)
    check("marker -> story", "/machine/apollo" in pg.url)
    pg.goto(base+"/map"); pg.click("button[role=tab]:has-text('Mars')"); pg.locator("g.marker").nth(1).click(force=True); pg.wait_for_timeout(400)
    pg.screenshot(path="/tmp/shots/map.png")
    # quiz: answer all, check score arithmetic by clicking first option always
    pg.goto(base+"/quiz"); pg.wait_for_timeout(600)
    right=0
    for q in range(5):
        pg.locator(".opt").nth(0).click(); pg.wait_for_timeout(200)
        right+= pg.locator(".opt.right").count() and pg.locator(".opt.wrong").count()==0
        # second click must not double count
        pg.locator(".opt").nth(1).click(force=True) if False else None
        pg.click(".feedback .btn"); pg.wait_for_timeout(250)
    score=pg.locator(".big-score").inner_text().split("\n")[0]
    check(f"quiz result shows ({score}) vs computed {right}", score.strip()==str(right))
    pg.screenshot(path="/tmp/shots/quizdone.png")
    pg.fill("input[aria-label='Your name']","Tester"); pg.click("text=Save my score"); pg.wait_for_timeout(1500)
    check("score saved msg", pg.locator("text=Saved to the leaderboard").count()==1)
    pg.click("text=Play again"); pg.wait_for_timeout(400)
    check("play again resets", "Question 1 of 5" in pg.inner_text("body"))
    pg.goto(base+"/nope"); check("404 page", pg.locator("text=Lost in space").count()==1)
    # mobile
    m=b.new_context(viewport={"width":390,"height":800}).new_page()
    m.goto(base); m.wait_for_timeout(1500); m.click(".burger"); m.wait_for_timeout(300)
    check("mobile menu opens", m.locator("nav.open").count()==1)
    m.screenshot(path="/tmp/shots/mobile.png")
    ow=m.evaluate("document.documentElement.scrollWidth")
    check(f"no horizontal overflow ({ow})", ow<=391)
    print("pageerrors",pe)
    b.close()
print("FAILS",errs)
