from bisect import bisect
from heapq import nsmallest

import numpy as np
import plotly.graph_objects as go
from scipy.optimize import minimize

## Insights from:
### https://plot.ly/python/3d-line-plots/
### https://www.youtube.com/watch?v=GqAdVQeIXA0
### https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.minimize.html#scipy.optimize.minimize

### Functions
def not_so_proper_divisors(n, propor=False):
    if propor:
        return [x for x in range(1, (n + 1) // 2 + 1) if n % x == 0 and n != x]
    else:
        return [x for x in range(1, (n + 1) // 2 + 1) if n % x == 0 and n != x] + [n]

def k_nearest(k, center, sorted_data):
    """Return *k* members of *sorted_data* nearest to *center*
        From: https://stackoverflow.com/questions/24112259/finding-k-closest-numbers-to-a-given-number
    """
    
    i = bisect(sorted_data, center)
    segment = sorted_data[max(i-k, 0) : i+k]
    return nsmallest(k, segment, key=lambda x: abs(x - center))

def func_prob(n, p, total):
    return (1-(1-p)**n)*total + total/n

def del_n_func_prob(n, p, total):
    return -total/n**2 - total*(1 - p)**n*np.log(1 - p)

def explained_func_minimize(fun, x0, p, total, jac, bounds, all_ns):
    """Here we have the functiion that minimizes:
        func: function that is supposed to get minemized
        x0: initial value
        args: args passed to the function. In this one, we pass p for each "curve" (class)
        jac: the jacobian of this function
        bounds: we delimit by n=1 beacuse its minimum value and n=total because
            its the '''total population'''.
        all_ns: to have a equal prob ina a group, it has to be a propor divisor.
            So, now we have to search in a custom domain (all_ns), to find the minimum
        Returns a tuple with a n_min list and z_min list
    """
    list_n_sol_int = []
    list_z_sol_int = []
    for cur_p in p:
        res = minimize(fun=fun, x0=x0, args=(cur_p, total), jac=jac, bounds=bounds) 
        n_sol = res.x[0]
        ## Solution value
        # z_sol = res.fun[0]
        n_sol_int_floor, n_sol_int_ceil = sorted(k_nearest(2, n_sol, all_ns))
        ## Getting its z value
        z_sol_for_n_int_floor = np.ceil(func_prob(n_sol_int_floor, cur_p, total))
        z_sol_for_n_int_ceil = np.ceil(func_prob(n_sol_int_ceil, cur_p, total))
        if z_sol_for_n_int_floor < z_sol_for_n_int_ceil:
            list_n_sol_int.append(n_sol_int_floor)
            list_z_sol_int.append(z_sol_for_n_int_floor)
        else:
            list_n_sol_int.append(n_sol_int_ceil)
            list_z_sol_int.append(z_sol_for_n_int_ceil)
    return (list_n_sol_int, list_z_sol_int,)

### Numbers
total = 1_000
### Getting proper_divisor near 100
near_100 = k_nearest(1, 100, not_so_proper_divisors(total))[0]

n = np.array(not_so_proper_divisors(near_100)) # sorted list
p = np.linspace(0.01, 0.3, 100)
nn, pp = np.meshgrid(n, p, sparse=False)
z = func_prob(nn,pp, total)
z_int = np.ceil(z)

n0 = 2
n_min, z_min = explained_func_minimize(fun=func_prob, x0=n0, p=p, total=total, jac=del_n_func_prob, bounds=[(1, total,),], all_ns=n)

### Plots
def func_fig(n, cur_p, z):
    a = go.Scatter3d(
        x=n, y=cur_p, z=z,
        mode="lines",
        line=dict(
            width=2
        ),
        name="",
        showlegend=False
    )
    return a

fig = go.Figure()
for cur_p, cur_list_z_int in zip(p, z_int):
    _ = fig.add_trace(func_fig(n, [cur_p]*n.shape[0], cur_list_z_int))

fig2 = go.Scatter3d(
    x=n_min, y=p, z=z_min,
    mode="lines",
    line=dict(
        color="magenta",
        width=5
    ),
    name="Minimum value",
    showlegend=True
)

_ = fig.add_trace(fig2)

_ = fig.update_layout(
    title="The Poisoned Drinks Problem",
    scene= {
		"xaxis":{"title": "N groups"},
		"yaxis":{"title": "prob"},
		"zaxis":{"title": "Total number of tests"},
	},
)
fig.show()
